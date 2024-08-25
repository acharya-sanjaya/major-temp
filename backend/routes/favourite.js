const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");
const getFavourite = require("../controllers/favourite/getFavourite");
const addToFavourite = require("../controllers/favourite/addToFavourite");
const removeFromFavourite = require("../controllers/favourite/removeFromFavourite");

// Apply the token validation middleware to all routes
router.use(validateToken);
router.get("/get-favourites", getFavourite);
router.post("/add-to-favourite/:bookId", addToFavourite);
router.delete("/remove-from-favourite/:bookId", removeFromFavourite);

module.exports = router;
