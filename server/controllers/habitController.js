const Habit = require('../models/Habit')

const createHabit = async(req, res) => {
    const { username, habitName, type } = req.body
    let habit = await Habit.findOne({
        owner_username: username,
        title: habitName
    })
    if (habit) { // habit already exists
        return res.status(409).json({
            message: `habit already exists for ${username}`
        })
    }

    // determine deadline based on type
    const deadline = new Date();
    switch (type) {
        case "daily":
            deadline.setDate(deadline.getDate() + 1);
            break;
        case "weekly":
            deadline.setDate(deadline.getDate() + (7 - deadline.getDay())); // sunday
            break;
        case "monthly":
            const endOfMonth = new Date(deadline.getFullYear(), deadline.getMonth() + 1, 0)
            deadline.setTime(endOfMonth.getTime())
            break;
    }
    deadline.setHours(23, 59, 59, 999) // end of day

    // create habit
    Habit.create({
        title: habitName,
        owner_username: username,
        type: type,
        cur_deadline: deadline
    })
    return res.status(200).json({
        message: `new habit created for ${username}: ${habitName}`
    })

}

module.exports = { createHabit }