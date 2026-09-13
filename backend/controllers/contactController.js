const EmergencyContact = require('../models/EmergencyContact');

// Get all emergency contacts
exports.getEmergencyContacts = async (req, res) => {
  try {
    const contacts = await EmergencyContact.find({ disasterType: 'FLOOD' }).sort({ category: 1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Admin: Add new emergency contact
exports.addEmergencyContact = async (req, res) => {
  try {
    const contact = new EmergencyContact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};