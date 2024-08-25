const User = require("../../models/user.js");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).json({message: "No users found"});
    }

    const noAdmin = users.filter((user) => user.role !== "admin");

    return res.status(200).json(noAdmin);
  } catch (error) {
    return res.status(500).json({message: "Server error", error: error.message});
  }
};

const getUserById = async (req, res) => {
  const {userId} = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({message: "Server error", error: error.message});
  }
};

const getUserByRole = async (req, res) => {
  const {role} = req.params;

  try {
    const user = await User.find({role});

    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByRole,
};
