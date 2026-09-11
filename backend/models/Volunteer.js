const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    district: {
      type: String,
      required: true
    },
    skills: [
      {
        type: String,
        enum: [
          'First Aid',
          'Medical',
          'Rescue',
          'Driving',
          'Communication',
          'Food distribution',
          'Search and rescue',
          'Technical support'
        ]
      }
    ],
    availability: {
      type: String,
      enum: ['AVAILABLE', 'BUSY', 'OFFLINE'],
      default: 'AVAILABLE'
    },
    vehicleOrResources: {
      type: String,
      default: ''
    },
    assignedRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AssistanceRequest'
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Volunteer', volunteerSchema);