const express = require("express");
const router = express.Router();
const {getAllBurrows, getBurrowByUserId} = require("../controllers/burrow/getBurrow");
const submitBook = require("../controllers/burrow/submitBook");

// Route to get all burrow records
router.get("/get-all-burrows", getAllBurrows);

// Route to get burrow records by user ID
router.get("/get-burrows-by-user-id/:userId", getBurrowByUserId);

// Route to submit a book and handle fines
router.post("/return-book/:burrowId", submitBook);

module.exports = router;
