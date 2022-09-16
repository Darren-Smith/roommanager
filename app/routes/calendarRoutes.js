const calendarController = require('../controllers/calendarController.js');

const {isAdmin, isLoggedIn} = require('./middleware');
const express = require('express');
const router = express.Router();

router.get('/', isLoggedIn, calendarController.showCalendar);



module.exports = router;

