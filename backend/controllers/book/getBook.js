const Book = require("../../models/book.js");

const getBookDetails = async (req, res) => {
  const {bookId} = req.params;

  try {
    // Find the book by ISBN
    const book = await Book.findOne({_id: bookId});
    if (!book) {
      return res.status(404).json({message: "Book not found"});
    }

    // Check if the book is premium and the user does not have access
    if (book.isPremium && !req.user.isPro) {
      return res.status(403).json({message: "Buy membership to access premium books"});
    }

    return res.status(200).json(book);
  } catch (error) {
    return res.status(200).json(null);
  }
};

const getBooksBrief = async (req, res) => {
  try {
    const books = await Book.find().populate("authorId", "fullName");

    if (books.length === 0) {
      return res.status(404).json({message: "No books found"});
    }

    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({message: "Server error", error: error.message});
  }
};

const getRecommendedBooks = async (req, res) => {
  try {
    const preference = req.body;

    if (!preference || typeof preference !== "object") {
      return res.status(400).json({message: "Invalid preferences format"});
    }

    let books = await Book.find().populate("authorId", "fullName");

    if (books.length === 0) {
      return res.status(404).json({message: "No books found"});
    }

    if (preference) {
      books = books
        .map((book) => {
          const recommendationScore = calculateRecommendationScore(book, preference);
          console.log(`Book: ${book.title}, Score: ${recommendationScore}`);
          return {
            ...book._doc,
            recommendationScore,
          };
        })
        .sort((a, b) => b.recommendationScore - a.recommendationScore); // Sort by score
    } else {
      books = books.sort((a, b) => b.createdAt - a.createdAt); // Sort by newest if no preferences
    }

    // Return only the top 10 books
    const topBooks = books.slice(0, 10);

    return res.status(200).json(topBooks);
  } catch (error) {
    return res.status(500).json({message: "Server error", error: error.message});
  }
};

const calculateRecommendationScore = (book, preference) => {
  let score = 0;

  // Calculate score based on genre preference
  if (book.genre && preference.genre && preference.genre[book.genre]) {
    score += preference.genre[book.genre];
  }

  // Calculate score based on author preference
  if (book.authorId && preference.author && preference.author[book.authorId._id.toString()]) {
    score += preference.author[book.authorId._id.toString()];
  }

  return score;
};

module.exports = {
  getBookDetails,
  getBooksBrief,
  getRecommendedBooks,
};
