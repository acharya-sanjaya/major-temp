const Fine = require("../../models/fine.js");

const getAllFines = async (req, res) => {
  try {
    // Only admins can access this route
    if (req.user.role !== "admin") {
      return res.status(403).json({message: "Access denied. Admins only."});
    }

    // Find all fines in the system
    const fines = await Fine.find().populate("userId");

    if (!fines.length) {
      return res.status(404).json({message: "No fines found"});
    }

    const finesList = fines.map((fine) => ({
      fineId: fine._id,
      userId: fine.userId._id,
      userName: fine.userId.fullName,
      amount: fine.amount,
      description: fine.description,
      status: fine.paid ? "paid" : "unpaid",
      issuedDate: fine.createdAt,
    }));

    res.status(200).json({finesList});
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

const getFinesByUserId = async (req, res) => {
  const userId = req.user.id;
  const userName = req.user.fullName;

  try {
    const fines = await Fine.find({userId});

    if (!fines.length) {
      return res.status(404).json({message: "No fines found"});
    }

    const finesList = fines.map((fine) => ({
      fineId: fine._id,
      userId,
      userName,
      amount: fine.amount,
      description: fine.description,
      status: fine.paid ? "paid" : "unpaid",
      issuedDate: fine.createdAt,
    }));

    res.status(200).json({finesList});
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

const getFineByFineId = async (req, res) => {
  const {fineId} = req.params;

  try {
    const fine = await Fine.findById(fineId).populate("userId");

    if (!fine) {
      return res.status(404).json({message: "Fine not found"});
    }

    res.status(200).json({
      fine: {
        fineId: fine._id,
        userId: fine.userId._id,
        userName: fine.userId.fullName,
        amount: fine.amount,
        description: fine.description,
        status: fine.paid ? "paid" : "unpaid",
        issuedDate: fine.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = {
  getAllFines,
  getFinesByUserId,
  getFineByFineId,
};
