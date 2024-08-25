const Favourite = require("../../models/favourite.js"); // The Favourite model
const Book = require("../../models/book.js");

const addToFavourite = async (req, res) => {
  const userId = req.user.id;
  const {bookId} = req.params;

  try {
    // Check if the user is a reader
    // if (req.user.role !== "reader") {
    //   return res.status(403).json({message: "Only readers can add books to favourites"});
    // }

    // Find the book by ID
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({message: "Book not found"});
    }

    // Check if the book is already in the user's favorites list
    const existingFavourite = await Favourite.findOne({userId, bookId});
    if (existingFavourite) {
      return res.status(400).json({message: "Book is already in your favorites"});
    }

    // Add the book to the user's favorites list
    const newFavourite = new Favourite({userId, bookId});
    await newFavourite.save();

    return res
      .status(200)
      .json({message: "Book added to favorites successfully", favoriteId: newFavourite._id});
  } catch (error) {
    return res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = addToFavourite;
