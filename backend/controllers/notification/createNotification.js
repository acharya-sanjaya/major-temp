const Notification = require("../../models/notification.js");

const createNotification = async (req, res) => {
  const {userId, type, message} = req.body;
  const initiatorId = req.user.id;
  try {
    const notification = new Notification({
      initiatorId,
      userId,
      type,
      message,
    });

    await notification.save();
    return res.status(201).json({message: "Notification created successfully"});
  } catch (error) {
    res.status(500).json({message: "Could not create notification", error: error.message});
  }
};

module.exports = createNotification;
