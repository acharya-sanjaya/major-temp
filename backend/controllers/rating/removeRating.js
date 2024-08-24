const Rating = require("../../models/rating");
const Book = require("../../models/book");

const removeRating = async (req, res) => {
  const {ratingId} = req.params;

  try {
    const user = req.user;

    const rating = await Rating.findById(ratingId);
    if (!rating) {
      return res.status(404).json({message: "Rating not found"});
    }

    // Only the user who gave the rating can delete it
    if (!rating.userId.equals(user._id)) {
      return res.status(403).json({message: "You can only delete your own rating"});
    }

    const book = await Book.findById(rating.bookId);

    // Update avgRating and ratingsCount
    if (book.ratingsCount === 1) {
      book.avgRating = 0;
    } else {
      book.avgRating = (book.avgRating * book.ratingsCount - rating.star) / (book.ratingsCount - 1);
    }
    book.ratingsCount -= 1;

    await rating.deleteOne();
    await book.save();

    res.status(200).json({message: "Rating removed successfully"});
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = removeRating;
