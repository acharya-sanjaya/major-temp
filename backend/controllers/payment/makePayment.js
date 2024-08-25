const Payment = require("../../models/payment");
const User = require("../../models/user"); // Import the User model

const makePayment = async (req, res) => {
  const {amount, paymentMethod, status, paymentDate} = req.body;
  const userId = req.user.id;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    // Check if the user has sufficient balance
    if (user.balance < amount) {
      return res.status(400).json({message: "Insufficient balance"});
    }

    // Create a new payment
    const newPayment = new Payment({
      userId,
      amount,
      paymentMethod,
      status: status || "pending",
      paymentDate: paymentDate || Date.now(),
    });

    // Save the payment to the database
    const savedPayment = await newPayment.save();

    // Update the user's balance
    user.balance -= amount;
    await user.save();

    // Return the saved payment response
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = {makePayment};
