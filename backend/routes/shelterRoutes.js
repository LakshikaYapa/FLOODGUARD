const express = require('express');
const router = express.Router();
const { createShelter, getAllShelters, updateShelter, getNearbyShelters } = require('../controllers/shelterController');

// Public routes
router.get('/', getAllShelters);
router.get('/nearby', getNearbyShelters);

// Create and Update routes
router.post('/', createShelter);
router.put('/:id', updateShelter);

module.exports = router;