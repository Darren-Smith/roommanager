const reportController = require('../controllers/reportController.js');

const {isAdmin, isLoggedIn} = require('./middleware');
const express = require('express');
const router = express.Router();

router.get('/', isLoggedIn, reportController.showReports);



module.exports = router;