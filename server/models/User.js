const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    dateCreated: {
        type: Date,
        require: true,
        default: Date.now()
    }
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema);