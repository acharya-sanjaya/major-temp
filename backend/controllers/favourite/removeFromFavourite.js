const Favourite = require("../../models/favourite.js");
const Book = require("../../models/book.js");

const removeFromFavourite = async (req, res) => {
  const userId = req.user.id;
  const {bookId} = req.params;

  try {
    // Check if the user is a reader
    // if (req.user.role !== "reader") {
    //   return res.status(403).json({message: "Only readers can remove books from favorites"});
    // }

    // Find the book by ID
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({message: "Book not found"});
    }

    // Find and remove the book from the user's favorites list
    const result = await Favourite.deleteOne({userId, bookId});
    if (result.deletedCount === 0) {
      return res.status(400).json({message: "Book is not in your favorites"});
    }

    return res.status(200).json({message: "Book removed from favorites successfully"});
  } catch (error) {
    return res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = removeFromFavourite;
