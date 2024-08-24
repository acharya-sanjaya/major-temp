const User = require("../../models/user");

// Suspend the user
const suspendUser = async (req, res) => {
  const {userId} = req.body;
  try {
    // Check if the user has the admin role
    if (req.user.role !== "reader") {
      return res.status(403).json({message: "Only the admin can suspend users"});
    }

    // Find the user to suspend
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    if (user.role === "admin") {
      return res.status(400).json({message: "Admins can't be suspended"});
    }

    user.isActive = false;
    user.remarks = req.body.remarks ?? "Inappropriate behavior";
    await user.save();

    return res.status(200).json({
      message: `${req.body.userId} suspended successfully`,
    });
  } catch (error) {
    return res.status(500).json({message: "Server error", error: error.message});
  }
};

// Remove suspension
const removeSuspension = async (req, res) => {
  const {userId} = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    // Remove suspension
    user.isActive = true;
    user.remarks = null;
    await user.save();

    // Send success response
    return res.status(200).json({message: "Suspension removed successfully"});
  } catch (error) {
    return res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = {
  suspendUser,
  removeSuspension,
};
