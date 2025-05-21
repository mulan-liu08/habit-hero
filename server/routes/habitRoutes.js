const express = require('express')
const router = express.Router()
const { createHabit, getAllHabits, checkOffHabit, editHabitInfo } = require('../controllers/habitController')

router.post('/create', createHabit);
router.get('/get-habits', getAllHabits);
router.put('/checkoff-habit', checkOffHabit)
router.put('/edit', editHabitInfo)

module.exports = router