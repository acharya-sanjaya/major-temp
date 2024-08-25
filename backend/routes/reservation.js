const express = require("express");
const router = express.Router();

const {
  getAllReservations,
  getReservationByUserId,
  getReservationByBookId,
  getReservationByReservationId,
} = require("../controllers/reservation/getReservations");

const reserveBook = require("../controllers/reservation/reserveBook");
const {updateStatus} = require("../controllers/reservation/updateReservation");
const deleteReservation = require("../controllers/reservation/deleteReservation");

const validateToken = require("../middlewares/validateToken");

// Middleware to validate token for protected routes
router.use(validateToken);

// Routes for reservation management
router.get("/get-all-reservations", getAllReservations);
router.get("/get-reservation-by-user", getReservationByUserId);
router.get("/get-reservation-by-book/:bookId", getReservationByBookId);
router.get("/get-reservation-by-id/:reservationId", getReservationByReservationId);

// Routes for creating a reservation
router.post("/create-reservation/:bookId", reserveBook);

// Route for updating reservation status
router.patch("/update-reservation-status/:reservationId", updateStatus);

// Delete reservation by ID
router.delete("/delete-reservation/:reservationId", deleteReservation);

module.exports = router;
