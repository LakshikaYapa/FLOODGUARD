const express = require('express');
const router = express.Router();
const { registerOrUpdateVolunteer, getVolunteers } = require('../controllers/volunteerController');

router.get('/', getVolunteers);
router.post('/register', registerOrUpdateVolunteer);

module.exports = router;