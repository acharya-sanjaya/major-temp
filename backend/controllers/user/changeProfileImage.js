const path = require("path");
const User = require("../../models/user");
const deleteFile = require("../../middlewares/deleteFile");

const changeProfileImage = async (req, res) => {
  const userId = req.user.id;
  const newProfileImage =
    req.files && req.files.profileImage ? req.files.profileImage[0].path : null;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    // Update the profile image URL
    user.profileImageUrl = newProfileImage;
    await user.save();

    // Delete the old profile image after newImageUrl is updated
    if (user.profileImageUrl) {
      const oldImagePath = path.join(__dirname, "../../", user.profileImageUrl);
      deleteFile(oldImagePath, (err) => {
        if (err) {
          console.error(`Failed to delete old profile image: ${err.message}`);
          return res.status(500).json({message: "Failed to delete old profile image"});
        }
      });
    }

    res.status(200).json({message: "Profile image updated successfully", user});
  } catch (error) {
    console.error(`Error updating profile image: ${error.message}`);
    res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = changeProfileImage;
