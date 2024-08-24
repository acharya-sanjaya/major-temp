const express = require("express");
const getAllGenre = require("../controllers/genre/getAllGenre");
const addGenre = require("../controllers/genre/addGenre");
const removeGenre = require("../controllers/genre/removeGenre");

const router = express.Router();

router.get("/getAllGenre", getAllGenre);
router.post("/addGenre", addGenre);
router.post("/removeGenre", removeGenre);

module.exports = router;
