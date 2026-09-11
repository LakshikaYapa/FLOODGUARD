const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createReport, getAllReports, getNearbyReports } = require('../controllers/reportController');

// Public route to fetch all reports
router.get('/', getAllReports);
router.get('/nearby', getNearbyReports); // Geo-Query Route
// Protected route to create a new report (Requires JWT token)
router.post('/', authMiddleware, createReport);

module.exports = router;