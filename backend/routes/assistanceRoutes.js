const express = require('express');
const router = express.Router();
const { createRequest, getAllRequests, updateRequestStatus } = require('../controllers/assistanceController');

router.get('/', getAllRequests);
router.post('/', createRequest);
router.put('/:id', updateRequestStatus);

module.exports = router;