const Book = require("../../models/book.js");

const getBookDetails = async (req, res) => {
  const {bookId} = req.params;

  try {
    // Find the book by ISBN
    const book = await Book.findOne({_id: bookId});
    if (!book) {
      return res.status(404).json({message: "Book not found"});
    }

    // Check if the book is premium and the user does not have access
    if (book.isPremium && !req.user.isPro) {
      return res.status(403).json({message: "Buy membership to access premium books"});
    }

    return res.status(200).json(book);
  } catch (error) {
    return res.status(200).json(null);
  }
};

const getBooksBrief = async (req, res) => {
  try {
    // const {options} = req.body;

    // Find books based on the provided options (e.g., authorId, genre, isPremium)
    // const books = await Book.find({...options});
    const books = await Book.find();

    if (books.length === 0) {
      return res.status(404).json({message: "No books found"});
    }

    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = {
  getBookDetails,
  getBooksBrief,
};
