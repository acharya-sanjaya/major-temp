const Burrow = require("../../models/burrow");
const Fine = require("../../models/fine");

const submitBook = async (req, res) => {
  const {burrowId} = req.params;
  const {returnedAt} = req.body;

  try {
    const burrow = await Burrow.findById(burrowId);
    if (!burrow) {
      return res.status(404).json({message: "Burrow record not found"});
    }

    // Update the returnedAt date
    burrow.returnedAt = returnedAt || new Date();
    await burrow.save();

    // Calculate fine if overdue
    if (burrow.returnedAt > burrow.dueDate) {
      const daysOverdue = Math.ceil((burrow.returnedAt - burrow.dueDate) / (1000 * 60 * 60 * 24));
      const fineAmount = daysOverdue * 5;

      const fine = new Fine({
        userId: burrow.userId,
        amount: fineAmount,
        description: `Delayed Submission - ${daysOverdue} days`,
      });

      await fine.save();
    }

    res.status(200).json({message: "Book submitted successfully", burrow});
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = submitBook;
