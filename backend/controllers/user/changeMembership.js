const User = require("../../models/user");

// Add 30 days to the membership
const addMembership = async (req, res) => {
  try {
    // Check if the user has the reader role
    if (req.user.role !== "reader") {
      return res.status(403).json({message: "User with the reader role can only add membership"});
    }

    // Find the user by ID
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    // Check if the user is already a premium member
    if (req.user.pro) {
      return res
        .status(400)
        .json({message: "You are already a premium member", membershipExpiresOn: user.proExpiry});
    }

    // Add 30 days to the membership
    const thirtyDays = 1000 * 60 * 60 * 24 * 30;
    const now = Date.now();

    user.proExpiry = new Date(now + thirtyDays);
    await user.save();

    return res.status(200).json({
      message: "Membership added successfully",
      membershipExpiresOn: user.proExpiry,
    });
  } catch (error) {
    return res.status(500).json({message: "Server error", error: error.message});
  }
};

// Remove the membership
const removeMembership = async (req, res) => {
  try {
    // Check if the user has the reader role
    if (req.user.role !== "reader") {
      return res.status(403).json({message: "Only the readers can remove membership"});
    }

    if (!req.user.pro) {
      return res.status(400).json({message: "You don't have and active membership to remove"});
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    // Set proExpiry to null to remove membership
    user.proExpiry = null;
    await user.save();

    // Send success response
    return res.status(200).json({message: "Membership removed successfully"});
  } catch (error) {
    return res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = {
  addMembership,
  removeMembership,
};
