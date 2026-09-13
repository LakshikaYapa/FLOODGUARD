const express = require('express');
const router = express.Router();
const { getEmergencyContacts, addEmergencyContact } = require('../controllers/contactController');

router.get('/', getEmergencyContacts);
router.post('/', addEmergencyContact);

module.exports = router;
