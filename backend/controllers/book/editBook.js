const path = require("path");
const Book = require("../../models/book.js");
const Genre = require("../../models/genre.js");
const deleteFile = require("../../middlewares/deleteFile.js");

const editBook = async (req, res) => {
  const {isbn, title, genre, description, isPremium} = req.body;

  const bookId = req.params.bookId;
  const authorId = req.user.id;

  try {
    // Find the book by ID
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({message: "Book not found"});
    }

    // Save the old files path to delete them later
    const oldCoverImageUrl = book.coverImageUrl;
    const oldPdfUrl = book.pdfUrl;

    // Only the book author or the admin can edit the book
    const isAuthorised = book.authorId.equals(authorId) || req.user.role === "admin";
    if (!isAuthorised) {
      return res.status(403).json({message: "You are not authorized to edit this book"});
    }

    // Validate that the provided genre exists in the Genre collection
    const validGenre = await Genre.findOne({name: genre});
    if (!validGenre) {
      return res.status(400).json({message: "Invalid genre"});
    }

    // Update the book details
    book.isbn = isbn || book.isbn;
    book.title = title || book.title;
    book.genre = genre || book.genre;
    book.description = description || book.description;
    book.isPremium = isPremium !== undefined ? isPremium : book.isPremium;

    // Handle file updates (cover image and PDF)
    const newCoverImageUrl = req.files["coverImage"] ? req.files["coverImage"][0].path : null;
    const newPdfUrl = req.files["pdf"] ? req.files["pdf"][0].path : null;

    // Update the file paths
    if (newCoverImageUrl) {
      book.coverImageUrl = newCoverImageUrl;
    }
    if (newPdfUrl) {
      book.pdfUrl = newPdfUrl;
    }

    // Save the updated book to the database
    await book.save();

    // If there’s a new cover image, delete the old one
    if (newCoverImageUrl && oldCoverImageUrl) {
      const oldCoverImagePath = path.join(__dirname, "../../", oldCoverImageUrl);
      deleteFile(oldCoverImagePath, (err) => {
        if (err) {
          console.error(`Failed to delete old cover image: ${err.message}`);
        }
      });
    }

    // If there’s a new PDF, delete the old one
    if (newPdfUrl && oldPdfUrl) {
      const oldPdfPath = path.join(__dirname, "../../", oldPdfUrl);
      deleteFile(oldPdfPath, (err) => {
        if (err) {
          console.error(`Failed to delete old PDF: ${err.message}`);
        }
      });
    }

    res.status(200).json({book, message: "Book updated successfully"});
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = editBook;
