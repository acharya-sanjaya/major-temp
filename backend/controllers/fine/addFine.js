const Fine = require("../../models/fine.js");
const User = require("../../models/user.js");

const addFine = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({message: "You are not authorized to perform this action"});
  }

  const {userId, amount, description} = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    // Create a new fine
    const fine = new Fine({
      userId,
      amount,
      description,
      paid: false,
    });

    await fine.save();

    res.status(201).json({message: "Fine added successfully", fine});
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = addFine;
