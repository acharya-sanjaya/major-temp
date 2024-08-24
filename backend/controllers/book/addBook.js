const Book = require("../../models/book.js");
const Genre = require("../../models/genre.js");

const addBook = async (req, res) => {
  const {isbn, title, genre, description, isPremium} = req.body;

  if (req.user.role === "reader")
    return res.status(403).json({message: "You are not authorized to add books"});

  const authorId = req.user.id;

  try {
    // Validate that the provided genre exists in the Genre collection
    const validGenre = await Genre.findOne({name: genre});
    if (!validGenre) {
      return res.status(400).json({message: "Invalid genre"});
    }

    // Check if the book already exists
    const existingBook = await Book.findOne({isbn});
    if (existingBook) {
      return res.status(400).json({message: "Book already exists"});
    }

    // Extract file paths from the uploaded files
    const coverImageUrl = req.files["coverImage"] ? req.files["coverImage"][0].path : null;
    const pdfUrl = req.files["pdf"] ? req.files["pdf"][0].path : null;

    // Create a new book document
    const newBook = new Book({
      isbn,
      title,
      authorId,
      genre,
      description,
      isPremium,
      coverImageUrl,
      pdfUrl,
    });

    // Save the newBook document to the database
    await newBook.save();

    res.status(200).json({book: newBook, message: "Book added successfully"});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

module.exports = addBook;
