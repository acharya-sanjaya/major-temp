const Genre = require("../../models/genre.js");

const addGenre = async (req, res) => {
  const {name} = req.body;
  const genreName = name.toUpperCase();

  try {
    // Check if the genre already exists
    const existingGenre = await Genre.findOne({name: genreName});
    if (existingGenre) {
      return res.status(400).json({message: "Genre already exists"});
    }

    // Create a new genre document
    const newGenre = new Genre({name: genreName});

    // Save the newGenre document to the database
    await newGenre.save();

    res.status(200).json({genre: newGenre, message: "Genre added successfully"});
  } catch (error) {
    // Handle any errors by sending an error response
    res.status(500).json({error: error.message});
  }
};

module.exports = addGenre;
