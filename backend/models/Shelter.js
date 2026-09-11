const mongoose = require('mongoose');

const shelterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  town: {
    type: String,
    required: true
  },
  address: {
    type: String
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
  capacity: {
    type: Number,
    required: true
  },
  contactPhone: {
    type: String,
    required: true
  },
  facilities: {
    type: String,
    default: ''
  },
  currentOccupancy: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['open', 'full', 'closed'],
    default: 'open'
  }
}, { timestamps: true });

shelterSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Shelter', shelterSchema);