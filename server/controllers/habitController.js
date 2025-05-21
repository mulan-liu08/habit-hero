const Habit = require('../models/Habit')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const { calculateDeadline } = require('../utils/utils.js')

// requires username, title, type
const createHabit = async(req, res) => {
    const { username, title, type } = req.body

    // check if habit already exists for user
    const habit = await Habit.findOne({
        username: username,
        title: title
    })
    if (habit) { 
        return res.status(409).json({
            message: `habit already exists for ${username}`
        })
    }

    // create habit
    const deadline = await calculateDeadline(type)
    Habit.create({
        ...req.body,
        deadline: deadline,
    })

    return res.status(200).json({
        message: `new habit created for ${username}: ${title}`
    })

}

// requires username
const getAllHabits = async(req, res) => {
    const { username } = req.body
    const habits = await Habit.find({ username: username })
    res.status(200).json(habits)
}

// requires username, title, count (how many counts this cycle to check off)
const checkOffHabit = async(req, res) => {
    const { username, title, count } = req.body;
    const habit = await Habit.findOne({ // find this habit
        username: username,
        title: title
    })

    // increase completion count by count and mark as completed if this new count exceeds the goal frequency
    let cur_count = habit.completion_count_cycle;
    const cur_cycles_completed = habit.total_completed_cycles;
    const goal_count = habit.frequency;
    cur_count += count;
    const completed = cur_count >= goal_count ? true : false;
    const new_total_cycles = ((habit.cycle_completed == false) && (completed == true)) ? 
        cur_cycles_completed + 1 : cur_cycles_completed;
    
    // update with new info
    await Habit.updateOne({ _id: new ObjectId(`${habit.id}`) }, {
        completion_count_cycle: cur_count,
        cycle_completed: completed,
        total_completed_cycles: new_total_cycles
    })

    return res.status(200).json({
        message: "habit info updated",
        new_cycle_count: cur_count,
        cycle_completed: completed,
        total_completed_cycles: new_total_cycles
    })
}

// requires username, cur title, new title and/or other changed fields
const editHabitInfo = async(req, res) => {
    const { username, cur_title } = req.body
    const habit = Habit.findOne({
        username: username,
        title: cur_title
    })
    if (!habit) {
        return res.status(404).send(`${username} does not have habit ${cur_title}`)
    }

    // recalculate deadline if type changed
    if ('type' in req.body) {
        const new_deadline = calculateDeadline(req.body.type)
        habit.deadline = new_deadline
    }

    // TODO: calculate cycle completion if frequency is changed

    return res.status(200).json({
        message: `habit ${cur_title} updated`
    })
}

module.exports = { createHabit, getAllHabits, checkOffHabit, editHabitInfo }