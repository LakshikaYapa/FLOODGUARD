const mongoose = require('mongoose');

const assistanceRequestSchema = new mongoose.Schema(
  {
    disasterType: {
      type: String,
      default: 'FLOOD'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Rescue required',
        'Medical emergency',
        'Food required',
        'Drinking water required',
        'Medicine required',
        'Elderly person needs assistance',
        'Child needs assistance',
        'Person with disability needs assistance',
        'Evacuation required',
        'Missing person',
        'Other'
      ]
    },
    priority: {
      type: String,
      required: true,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
      default: 'HIGH'
    },
    description: {
      type: String,
      required: true
    },
    district: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    contactPhone: {
      type: String,
      required: true
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number] // [Longitude, Latitude]
      }
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'In Progress', 'Resolved'],
      default: 'Pending'
    },
    assignedVolunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

assistanceRequestSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('AssistanceRequest', assistanceRequestSchema);