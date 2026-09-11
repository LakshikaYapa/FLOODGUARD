const Report = require('../models/Report');

// @desc    Create a new flood incident report
// @route   POST /api/reports
// @access  Private
exports.createReport = async (req, res) => {
  try {
    const { title, description, waterLevel, longitude, latitude, address } = req.body;

    const newReport = new Report({
      user: req.user.id, // User ID obtained from authMiddleware
      title,
      description,
      waterLevel,
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)], // [Longitude, Latitude] order
        address
      }
    });

    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all flood incident reports
// @route   GET /api/reports
// @access  Public
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('user', 'name email role')
      .sort({ createdAt: -1 });
      
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get reports near a specific location
// @route   GET /api/reports/nearby?longitude=80.2170&latitude=6.0535&dist=5000
// @access  Public
exports.getNearbyReports = async (req, res) => {
  try {
    const { longitude, latitude, dist } = req.query;

    if (!longitude || !latitude) {
      return res.status(400).json({ message: 'Longitude and latitude are required' });
    }

    const maxDistanceInMeters = dist ? parseInt(dist) : 5000; // Default distance: 5km (5000m)

    const reports = await Report.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: maxDistanceInMeters
        }
      }
    }).populate('user', 'name email role');

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};