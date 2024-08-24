const bcrypt = require("bcryptjs");
const User = require("../../models/user");

const changePassword = async (req, res) => {
  const userId = req.user.id;
  const {oldPassword, newPassword} = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    // Check if the old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({message: "Old password is incorrect"});
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update the user password
    user.password = hashedNewPassword;
    await user.save();

    // Respond with success message
    res.status(200).json({message: "Password changed successfully"});
  } catch (error) {
    console.error(`Error changing password: ${error.message}`);
    res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = changePassword;
