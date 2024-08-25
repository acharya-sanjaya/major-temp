const express = require("express");
const router = express.Router();
const addBook = require("../controllers/book/addBook");
const {getBooksBrief, getBookDetails, getRecommendedBooks} = require("../controllers/book/getBook");
const configureUploadMiddleware = require("../middlewares/fileUpload");
const validateToken = require("../middlewares/validateToken");

// Configuration for file upload middleware
const uploadFiles = configureUploadMiddleware({
  fileFields: [
    {name: "coverImage", maxCount: 1},
    {name: "pdf", maxCount: 1},
  ],
  destinationPaths: {
    coverImage: "uploads/book-cover/",
    pdf: "uploads/book-pdf/",
  },
  allowedTypes: {
    coverImage: ["image/jpeg", "image/png", "image/gif"],
    pdf: ["application/pdf"],
  },
  maxSizes: {
    coverImage: 5 * 1024 * 1024,
    pdf: 50 * 1024 * 1024,
  },
});

// Create api routes
router.post("/addBook", uploadFiles, validateToken, addBook);
router.get("/get-books-brief", getBooksBrief);
router.post("/get-recommended-books", getRecommendedBooks);
router.get("/get-book-details/:bookId", validateToken, getBookDetails);

module.exports = router;
