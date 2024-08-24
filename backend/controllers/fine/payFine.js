const Fine = require("../../models/fine.js");
const User = require("../../models/user.js");

const payFine = async (req, res) => {
  const userId = req.user.id;
  const {fineId} = req.body;

  try {
    // Find the fine by ID
    const fine = await Fine.findById(fineId);
    if (!fine) {
      return res.status(404).json({message: "Fine not found"});
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    // Authorization check
    if (!fine.userId.equals(userId)) {
      return res.status(403).json({message: "You are not authorized to pay this fine"});
    }

    if (fine.paid) {
      return res.status(403).json({message: "Fine is already paid"});
    }

    if (user.balance < fine.amount) {
      return res.status(403).json({message: "Insufficient balance"});
    }
    // Update the fine status
    fine.status = "paid";
    await fine.save();

    // Reduce the balance of the user
    user.balance -= fine.amount;
    await user.save();

    res.status(200).json({message: "Fine paid successfully", fine});
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = payFine;
