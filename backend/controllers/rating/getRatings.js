const Rating = require("../../models/rating");

const getRatingsByBookId = async (req, res) => {
  const {bookId} = req.params;

  try {
    const ratings = await Rating.find({bookId}).populate("userId", "fullName");

    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

const getRatingsByUserId = async (req, res) => {
  const userId = req.user._id;

  try {
    const ratings = await Rating.find({userId}).populate("bookId", "title coverImageUrl");

    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = {
  getRatingsByBookId,
  getRatingsByUserId,
};
