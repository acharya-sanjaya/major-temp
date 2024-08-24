const {connect} = require("mongoose");
const {configDotenv} = require("dotenv");

// Load environment variables from .env file
configDotenv();

const connectToTheDatabase = async () => {
  try {
    await connect(process.env.DATABASE_URL, {});
    console.log("Connected to the database successfully");
  } catch (err) {
    console.error("Error connecting to the database:\n", err);
  }
};

module.exports = connectToTheDatabase;
