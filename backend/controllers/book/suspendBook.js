const Book = require("../../models/book.js");

const suspendBook = async (req, res) => {
  const {isbn} = req.body;

  try {
    // Check if the user has the admin role
    if (req.user.role !== "admin") {
      return res.status(403).json({message: "Only the admin can suspend books"});
    }

    // Find the book by ISBN
    const book = await Book.findOne({isbn});
    if (!book) {
      return res.status(404).json({message: "Book not found"});
    }

    // Check if the book is already suspended
    if (book.suspended) {
      return res.status(400).json({message: "Book is already suspended"});
    }

    // Suspend the book
    book.suspended = true;
    await book.save();

    return res.status(200).json({
      message: "Book suspended successfully",
    });
  } catch (error) {
    return res.status(500).json({message: "Server error", error: error.message});
  }
};

const removeSuspension = async (req, res) => {
  const {isbn} = req.body;

  try {
    // Find the book by ISBN
    const book = await Book.findOne({isbn});
    if (!book) {
      return res.status(404).json({message: "Book not found"});
    }

    // Check if the user has the admin role
    if (req.user.role !== "admin") {
      return res.status(403).json({message: "Only the admin can remove the book suspension"});
    }

    // Check if the book is not suspended
    if (!book.suspended) {
      return res.status(400).json({message: "Book is not suspended"});
    }

    // Remove the suspension
    book.suspended = false;
    await book.save();

    return res.status(200).json({
      message: "Book removed from suspension successfully",
    });
  } catch (error) {
    return res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = {
  suspendBook,
  removeSuspension,
};
