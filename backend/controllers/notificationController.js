const Notification = require('../models/Notification');

// Get all notifications for current user or general broadcasts
exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    
    // Fetch system-wide broadcasts or user-specific notifications
    const notifications = await Notification.find({
      disasterType: 'FLOOD',
      $or: [{ user: null }, { user: userId }]
    }).sort({ createdAt: -1 }).limit(20);

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Create a notification (Admin / System generated)
exports.createNotification = async (req, res) => {
  try {
    const { title, message, type, userId } = req.body;

    const newNotification = new Notification({
      title,
      message,
      type: type || 'GENERAL',
      user: userId || null
    });

    const saved = await newNotification.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};