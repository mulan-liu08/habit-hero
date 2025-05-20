const mongoose = require('mongoose')

const habitSchema = new mongoose.Schema({
    title: String,
    owner_username: String,
    type: String,
    times_completed: {
        type: Number,
        default: 0
    },
    cur_deadline: Date
})

module.exports = mongoose.model.Habit || mongoose.model('Habit', habitSchema)