const Reservation = require("../../models/reservation.js");
const Book = require("../../models/book.js");

const reserveBook = async (req, res) => {
  const userId = req.user.id;
  const {bookId, dueDate, quantity} = req.body;

  try {
    // Check if the user is a reader
    if (req.user.role !== "reader") {
      return res.status(403).json({message: "Only readers can reserve books"});
    }

    // Find the book by ID
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({message: "Book not found"});
    }

    // Check if the book is premium and if the user is a pro user
    if (book.isPremium && !req.user.isPro) {
      return res.status(403).json({message: "Buy membership to reserve premium books"});
    }

    if (book.stock < quantity) {
      return res.status(403).json({message: "Out of stock"});
    }

    // Create a new reservation
    const reservation = new Reservation({
      userId,
      bookId,
      dueDate,
      quantity,
      status: "pending",
    });

    // Save the reservation to the database
    await reservation.save();

    res.status(201).json({message: "Book reserved successfully", reservation});
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = reserveBook;
