const Volunteer = require('../models/Volunteer');
const User = require('../models/User');

// Register / Update Volunteer Profile
exports.registerOrUpdateVolunteer = async (req, res) => {
  try {
    const { district, skills, availability, vehicleOrResources } = req.body;
    const userId = req.user ? req.user.id : req.body.userId;

    let volunteer = await Volunteer.findOne({ user: userId });

    if (volunteer) {
      volunteer.district = district || volunteer.district;
      volunteer.skills = skills || volunteer.skills;
      volunteer.availability = availability || volunteer.availability;
      volunteer.vehicleOrResources = vehicleOrResources !== undefined ? vehicleOrResources : volunteer.vehicleOrResources;
      await volunteer.save();
    } else {
      volunteer = new Volunteer({
        user: userId,
        district,
        skills,
        availability: availability || 'AVAILABLE',
        vehicleOrResources
      });
      await volunteer.save();

      // Update user roles if necessary
      await User.findByIdAndUpdate(userId, { $addToSet: { roles: 'volunteer' } });
    }

    res.status(200).json(volunteer);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get all volunteers
exports.getVolunteers = async (req, res) => {
  try {
    const { district, availability } = req.query;
    let query = {};

    if (district) query.district = district;
    if (availability) query.availability = availability;

    const volunteers = await Volunteer.find(query).populate('user', 'name email contactPhone');
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};