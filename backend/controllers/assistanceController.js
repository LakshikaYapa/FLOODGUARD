const AssistanceRequest = require('../models/AssistanceRequest');

// Create a new assistance request
exports.createRequest = async (req, res) => {
  try {
    const { category, priority, description, district, address, contactPhone, longitude, latitude } = req.body;

    const newRequest = new AssistanceRequest({
      user: req.user ? req.user.id : null,
      category,
      priority: priority || 'HIGH',
      description,
      district,
      address,
      contactPhone,
      ...(longitude && latitude && {
        location: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        }
      })
    });

    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get all assistance requests (Filterable by status or district)
exports.getAllRequests = async (req, res) => {
  try {
    const { status, district } = req.query;
    let query = { disasterType: 'FLOOD' };

    if (status) query.status = status;
    if (district) query.district = district;

    const requests = await AssistanceRequest.find(query)
      .populate('user', 'name email contactPhone')
      .populate('assignedVolunteer', 'name contactPhone')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update request status / assign volunteer
exports.updateRequestStatus = async (req, res) => {
  try {
    const { status, volunteerId } = req.body;
    const request = await AssistanceRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (status) request.status = status;
    if (volunteerId) request.assignedVolunteer = volunteerId;

    const updatedRequest = await request.save();
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};