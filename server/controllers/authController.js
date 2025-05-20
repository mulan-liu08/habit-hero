const User = require('../models/User')

// basic login -- no password required
const login = async(req, res) => {
    const { username } = req.body
    let user = await User.findOne({ username })
    if (!user) {
        User.create({ username })
    }
    return res.status(201).json({
        message: "login successful"
    })
}

module.exports = { login }