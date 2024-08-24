const Rating = require("../../models/rating");
const Book = require("../../models/book");

const changeRating = async (req, res) => {
  const {ratingId, star, review} = req.body;

  try {
    const user = req.user;

    const rating = await Rating.findById(ratingId);
    if (!rating) {
      return res.status(404).json({message: "Rating not found"});
    }

    // Only the user who gave the rating can modify it
    if (!rating.userId.equals(user._id)) {
      return res.status(403).json({message: "You can only modify your own rating"});
    }

    const book = await Book.findById(rating.bookId);

    // Update avgRating and ratingsCount
    book.avgRating = (book.avgRating * book.ratingsCount - rating.star + star) / book.ratingsCount;

    rating.star = star;
    rating.review = review;
    await rating.save();
    await book.save();

    res.status(200).json({message: "Rating updated successfully", rating});
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = changeRating;
