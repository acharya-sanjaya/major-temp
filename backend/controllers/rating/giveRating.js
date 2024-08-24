const Rating = require("../../models/rating");
const Book = require("../../models/book");

const giveRating = async (req, res) => {
  const {star, review} = req.body;
  const bookId = req.params.bookId;
  try {
    const user = req.user;

    // // Only readers can give ratings
    // if (user.role !== "reader") {
    //   return res.status(403).json({message: "Only readers can rate books"});
    // }

    const existingRating = await Rating.findOne({userId: user._id, bookId});
    if (existingRating) {
      return res.status(400).json({message: "You have already rated this book"});
    }

    // Create new rating
    const rating = new Rating({
      userId: user.id,
      bookId,
      star,
      review,
    });

    await rating.save();

    // Update book's avgRating and ratingsCount
    const book = await Book.findById(bookId);
    book.avgRating = (
      (book.avgRating * book.ratingsCount + star) /
      (book.ratingsCount + 1)
    ).toFixed(1);
    book.ratingsCount += 1;
    await book.save();

    res.status(201).json({message: "Rating added successfully", rating});
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = giveRating;
