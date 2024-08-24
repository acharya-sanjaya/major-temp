const User = require("../../models/user");

const changeFullName = async (req, res) => {
  const {userId} = req.user.id;
  const {newName} = req.body;

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    user.fullName = newName;
    await user.save();

    return res.status(200).json({
      message: "Full Name updated successfully",
    });
  } catch (error) {
    return res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = changeFullName;
