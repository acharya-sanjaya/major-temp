const User = require("../../models/user.js");

const addBalance = async (req, res) => {
  // Only admins can add balance
  if (req.user.role !== "admin") {
    return res.status(403).json({message: "You are not authorized to add balance"});
  }

  const {userId, amount} = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    if (user.role !== "reader") {
      return res.status(403).json({message: "Only readers can have balance added"});
    }

    // Validate the amount (0 - 100,000)
    const isValid = typeof amount === "number" && amount > 0 && amount <= 100000;
    if (!isValid) {
      console.log(typeof amount);
      return res.status(400).json({message: "Invalid amount. Please enter a positive number."});
    }

    // Update the user balance
    if (user.balance) {
      user.balance += amount;
    } else {
      user.balance = amount;
    }
    await user.save();

    res.status(200).json({message: `Rs. ${amount} added to ${user.fullName}'s balance`, user});
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = addBalance;
