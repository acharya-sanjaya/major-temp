const Fine = require("../../models/fine.js");

const removeFine = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({message: "You are not authorized to perform this action"});
  }

  const {fineId} = req.body;

  try {
    const fine = await Fine.findById(fineId);
    if (!fine) {
      return res.status(404).json({message: "Fine not found"});
    }

    await fine.remove();

    res.status(200).json({message: "Fine removed successfully"});
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = removeFine;
