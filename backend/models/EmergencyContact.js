const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      si: { type: String, required: true }
    },
    category: {
      type: String,
      enum: ['POLICE', 'FIRE_RESCUE', 'AMBULANCE', 'DISASTER_MANAGEMENT', 'LOCAL_AUTHORITY'],
      required: true
    },
    phone: { type: String, required: true },
    district: { type: String, default: 'All Island' },
    disasterType: { type: String, default: 'FLOOD' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('EmergencyContact', emergencyContactSchema);