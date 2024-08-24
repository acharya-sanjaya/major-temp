const Notification = require("../../models/notification.js");

const markNotificationsAsRead = async (req, res) => {
  const {notificationIds} = req.body;
  const {userId} = req.user;

  try {
    const notifications = await Notification.find({_id: {$in: notificationIds}});

    if (!notifications.length) {
      return res.status(404).json({message: "No notifications found"});
    }

    const unauthorized = notifications.filter(
      (notification) =>
        userId !== notification.userId.toString() &&
        userId !== notification.initiatorId.toString() &&
        userId !== notification.adminId.toString()
    );

    if (unauthorized.length > 0) {
      return res
        .status(403)
        .json({message: "You are not authorized to mark some notifications as read"});
    }

    await Notification.updateMany({_id: {$in: notificationIds}}, {read: true});

    res.status(200).json({message: "Notifications marked as read successfully"});
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = markNotificationsAsRead;
