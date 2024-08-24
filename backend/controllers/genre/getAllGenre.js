const Genre = require("../../models/genre.js");

const getAllGenre = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json({genres});
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getAllGenre;
