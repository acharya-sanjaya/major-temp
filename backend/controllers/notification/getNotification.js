const Notification = require("../../models/notification.js");

const getNotifications = async (req, res) => {
  const userId = req.user.id;

  try {
    const notifications = await Notification.find({userId}).sort({createdAt: -1});

    if (!notifications.length) {
      return res.status(404).json({message: "No notifications found"});
    }

    res.status(200).json({notifications});
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({}).sort({createdAt: -1});

    if (!notifications.length) {
      return res.status(404).json({message: "No notifications found"});
    }

    res.status(200).json({notifications});
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

const getNotificationsById = async (req, res) => {
  const {notificationId} = req.params;

  try {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({message: "Notification not found"});
    }

    res.status(200).json({notification});
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = {getNotifications, getAllNotifications, getNotificationsById};
