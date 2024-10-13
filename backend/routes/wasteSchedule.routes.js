const express = require('express');
const router = express.Router();
const {createSchedule, getAllSchedules, getScheduleById, updateSchedule, deleteSchedule} = require('../controllers/wasteSchedule.controller');
const verifyUser = require('../util/verifyUser')

router.post('/',verifyUser, createSchedule)
router.get('/',verifyUser, getAllSchedules)
router.get('/:id',verifyUser, getScheduleById)
router.put('/:id',verifyUser, updateSchedule)
router.delete('/:id',verifyUser, deleteSchedule)


module.exports = router;