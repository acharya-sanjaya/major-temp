const express = require("express");
const Reservation = require("../../models/reservation.js");

const deleteReservation = async (req, res) => {
  const {reservationId} = req.params;

  try {
    const reservation = await Reservation.findByIdAndDelete(reservationId);

    if (!reservation) {
      return res.status(404).json({message: "Reservation not found"});
    }

    res.status(200).json({message: "Reservation deleted successfully"});
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = deleteReservation;
