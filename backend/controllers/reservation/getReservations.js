const Reservation = require("../../models/reservation.js");

const getAllReservations = async (req, res) => {
  try {
    // // Ensure only admins can access this route
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({message: "Access denied. Admins only."});
    // }

    // Find all reservations in the system
    const reservations = await Reservation.find()
      .populate("userId")
      .populate({
        path: "bookId",
        select: "title coverImageUrl",
      })
      .sort({createdAt: -1});

    if (!reservations.length) {
      return res.status(404).json({message: "No reservations found"});
    }

    const reservationsList = reservations.map((reservation) => ({
      reservationId: reservation._id,
      userId: reservation.userId._id,
      userName: reservation.userId.fullName,
      bookId: reservation.bookId._id,
      bookTitle: reservation.bookId.title,
      coverImage: reservation.bookId.coverImageUrl,
      reservedQuantity: reservation.quantity,
      status: reservation.status,
      reservedDate: reservation.createdAt,
      dueDate: reservation.dueDate,
    }));

    res.status(200).json(reservationsList);
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

const getReservationByUserId = async (req, res) => {
  const userId = req.user.id;
  const userName = req.user.fullName;

  try {
    const reservations = await Reservation.find({userId}).populate("bookId");

    if (!reservations.length) {
      return res.status(404).json({message: "No reservations found"});
    }

    const reservationsList = reservations.map((reservation) => ({
      reservationId: reservation._id,
      userId,
      userName,
      bookId: reservation.bookId._id,
      bookTitle: reservation.bookId.title,
      coverImage: reservation.bookId.coverImage,
      reservedQuantity: reservation.quantity,
      status: reservation.status,
      reservedDate: reservation.createdAt,
      dueDate: reservation.dueDate,
    }));

    res.status(200).json(reservationsList);
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

const getReservationByBookId = async (req, res) => {
  const {bookId} = req.params;

  try {
    const reservations = await Reservation.find({bookId}).populate("bookId").populate("userId");

    if (!reservations.length) {
      return res.status(404).json({message: "No reservations found"});
    }

    const reservationsList = reservations.map((reservation) => ({
      reservationId: reservation._id,
      userId: reservation.userId._id,
      userName: reservation.userId.fullName,
      bookId: reservation.bookId._id,
      bookTitle: reservation.bookId.title,
      coverImage: reservation.bookId.coverImage,
      reservedQuantity: reservation.quantity,
      status: reservation.status,
      reservedDate: reservation.createdAt,
      dueDate: reservation.dueDate,
    }));

    res.status(200).json(reservationsList);
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

const getReservationByReservationId = async (req, res) => {
  const {reservationId} = req.params;

  try {
    const reservation = await Reservation.findOne({_id: reservationId})
      .populate("bookId")
      .populate("userId");

    if (!reservation) {
      return res.status(404).json({message: "Reservation not found"});
    }

    res.status(200).json({
      reservationId,
      userId: reservation.userId._id,
      userName: reservation.userId.fullName,
      bookId: reservation.bookId._id,
      bookTitle: reservation.bookId.title,
      coverImage: reservation.bookId.coverImage,
      reservedQuantity: reservation.quantity,
      status: reservation.status,
      reservedDate: reservation.createdAt,
      dueDate: reservation.dueDate,
    });
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = {
  getAllReservations,
  getReservationByUserId,
  getReservationByBookId,
  getReservationByReservationId,
};
