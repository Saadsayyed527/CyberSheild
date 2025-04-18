const express = require('express');
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/report/generateReport', authMiddleware, reportController.generateReport);

module.exports = router;
