const Genre = require("../../models/genre.js");

const removeGenre = async (req, res) => {
  const {name} = req.body;
  const genreName = name.toUpperCase();

  try {
    // Check if the genre exists
    const existingGenre = await Genre.findOne({name: genreName});
    if (!existingGenre) {
      return res.status(404).json({message: "Genre not found"});
    }

    // Remove the genre document from the database
    await Genre.deleteOne({name: genreName});

    res.status(200).json({message: "Genre removed successfully"});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

module.exports = removeGenre;
