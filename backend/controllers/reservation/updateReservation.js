const Reservation = require("../../models/reservation.js");
const Book = require("../../models/book.js");

const updateStatus = async (req, res) => {
  const userId = req.user.id;
  const {reservationId, status} = req.body;

  try {
    // Find the reservation by ID
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({message: "Reservation not found"});
    }

    const book = await Book.findById(reservation.bookId);
    if (!book) {
      return res.status(404).json({message: "Book not found"});
    }

    // Authorization check
    const isAuthorized = reservation.userId.equals(userId) || req.user.role === "admin";
    if (!isAuthorized) {
      return res.status(403).json({message: "You are not authorized to update this reservation"});
    }

    if (reservation.status !== "pending") {
      return res.status(403).json({message: "Reservation is already processed"});
    }

    if (book.stock < reservation.quantity) {
      return res.status(400).json({message: "Not enough stock available"});
    }

    // Update the reservation status
    reservation.status = status;
    await reservation.save();

    // Reduce the stock after reservation is approved
    if (status === "approved") {
      book.stock -= reservation.quantity;
      await book.save();
    }

    res.status(200).json({message: "Reservation updated successfully", reservation});
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

const updateQuantity = async (req, res) => {
  const userId = req.user.id;
  const {reservationId, quantity} = req.body;

  try {
    // Find the reservation by ID
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({message: "Reservation not found"});
    }

    const book = await Book.findById(reservation.bookId);
    if (!book) {
      return res.status(404).json({message: "Book not found"});
    }

    // Authorization check
    const isAuthorized = reservation.userId.equals(userId) || req.user.role === "admin";
    if (!isAuthorized) {
      return res.status(403).json({message: "You are not authorized to update this reservation"});
    }

    if (reservation.status !== "pending") {
      return res.status(403).json({message: "Reservation is already processed"});
    }

    if (book.stock < quantity - reservation.quantity) {
      return res.status(400).json({message: "Not enough stock available"});
    }

    // Update the reservation quantity
    reservation.quantity = quantity;
    await reservation.save();

    res.status(200).json({message: "Reservation updated successfully", reservation});
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = {updateStatus, updateQuantity};
