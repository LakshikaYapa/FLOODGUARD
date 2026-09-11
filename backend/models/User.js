const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    enum: ['victim', 'volunteer', 'donor', 'officer', 'admin'],
    default: ['victim']
  },
  preferredLanguage: {
    type: String,
    enum: ['en', 'si'],
    default: 'en'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);