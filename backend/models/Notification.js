const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    disasterType: {
      type: String,
      default: 'FLOOD'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null // null means broadcast to all users
    },
    title: {
      en: { type: String, required: true },
      si: { type: String, required: true }
    },
    message: {
      en: { type: String, required: true },
      si: { type: String, required: true }
    },
    type: {
      type: String,
      enum: ['ALERT', 'REQUEST_UPDATE', 'SHELTER_UPDATE', 'GENERAL'],
      default: 'GENERAL'
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);