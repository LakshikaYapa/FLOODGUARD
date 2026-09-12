const FloodReport = require('../models/FloodReport');
const AssistanceRequest = require('../models/AssistanceRequest');
const Shelter = require('../models/Shelter');
const Volunteer = require('../models/Volunteer');
const Notification = require('../models/Notification');

// Get overall disaster management analytics
exports.getAdminStats = async (req, res) => {
  try {
    const totalReports = await FloodReport.countDocuments({ disasterType: 'FLOOD' });
    const verifiedReports = await FloodReport.countDocuments({ disasterType: 'FLOOD', status: 'Verified' });
    
    const totalRequests = await AssistanceRequest.countDocuments({ disasterType: 'FLOOD' });
    const urgentRequests = await AssistanceRequest.countDocuments({ disasterType: 'FLOOD', priority: 'URGENT', status: 'Pending' });

    const totalShelters = await Shelter.countDocuments({ disasterType: 'FLOOD' });
    const activeVolunteers = await Volunteer.countDocuments({ availability: 'AVAILABLE' });

    res.json({
      totalReports,
      verifiedReports,
      totalRequests,
      urgentRequests,
      totalShelters,
      activeVolunteers
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update Report Status (Verify / Reject / Resolve)
exports.updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const report = await FloodReport.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Broadcast System Emergency Alert
exports.broadcastAlert = async (req, res) => {
  try {
    const { title, message, riskLevel } = req.body;

    const notification = new Notification({
      title,
      message,
      type: 'ALERT',
      user: null // Send to all users
    });

    await notification.save();
    res.status(201).json({ message: 'Emergency Alert Broadcasted Successfully', notification });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};