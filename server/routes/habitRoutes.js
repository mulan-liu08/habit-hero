const express = require('express')
const router = express.Router()
const { createHabit, getAllHabits } = require('../controllers/habitController')

router.post('/create', createHabit);

module.exports = router