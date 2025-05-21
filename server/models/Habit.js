const mongoose = require('mongoose')

const habitSchema = new mongoose.Schema({
    title: String,
    username: String,
    type: String,
    frequency: { // e.g. goal times per week
        type: Number,
        default: 1
    },
    cycle_completed: { // finished habit this cycle (e.g. today)?
        type: Boolean,
        default: false
    },
    completion_count_cycle: { // how many times this habit was performed this cycle (e.g. week); goal is frequency
        type: Number,
        default: 0
    },
    total_completed_cycles: { // how many cycles this habit has been successfully upheld
        type: Number,
        default: 0
    },
    deadline: Date // deadline of this cycle
})

habitSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        ret.id = ret._id
        delete ret._id
    }
})

module.exports = mongoose.model.Habit || mongoose.model('Habit', habitSchema)