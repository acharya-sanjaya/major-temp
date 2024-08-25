const Payment = require("../../models/payment");

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("userId", "fullName");
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const getPaymentByUserId = async (req, res) => {
  const {userId} = req.params;

  try {
    const payments = await Payment.find({userId});
    if (payments.length === 0) {
      return res.status(404).json({message: "No payments found for this user."});
    }
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = {getAllPayments, getPaymentByUserId};
