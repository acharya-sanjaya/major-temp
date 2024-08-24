const Favourite = require("../../models/favourite.js");
const Book = require("../../models/book.js");

const getFavorite = async (req, res) => {
  const userId = req.user.id;

  try {
    // Find all favorite books for the user
    const favorites = await Favourite.find({userId}).select("bookId");
    if (favorites.length === 0) {
      return res.status(404).json({message: "No favorites found for this user"});
    }

    // Extract all bookIds from the favorites
    const bookIds = favorites.map((fav) => fav.bookId);

    // Find the books with their details
    const books = await Book.find({_id: {$in: bookIds}}).select("title rating coverUrl");

    return res.status(200).json({books});
  } catch (error) {
    return res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = getFavorite;
