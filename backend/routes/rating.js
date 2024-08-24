const express = require("express");
const {getRatingsByBookId} = require("../controllers/rating/getRatings");
const giveRating = require("../controllers/rating/giveRating");
const validateToken = require("../middlewares/validateToken");
const router = express.Router();

router.get("/get-ratings/:bookId", getRatingsByBookId);
router.post("/give-rating/:bookId", validateToken, giveRating);

module.exports = router;
