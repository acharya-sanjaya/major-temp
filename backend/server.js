const connectToTheDatabase = require("./config/db.js");
const userRoutes = require("./routes/user.js");
const bookRoutes = require("./routes/book.js");
const genreRoutes = require("./routes/genre.js");
const ratingRoutes = require("./routes/rating.js");
const reservationRoutes = require("./routes/reservation.js");
const burrowRoutes = require("./routes/burrow.js");
const paymentRoutes = require("./routes/payment.js");
const favouriteRoutes = require("./routes/favourite.js");

const express = require("express");
const cors = require("cors");
const {configDotenv} = require("dotenv");
const morgan = require("morgan");
const path = require("path");

// Load environment variables from .env file
configDotenv();

connectToTheDatabase();

const app = express();
const port = process.env.PORT || 4000;

// Middleware to parse JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Middleware to handle CORS - used to allow cross-origin requests
app.use(cors());

// Middleware to log incoming requests
app.use(morgan("dev"));

// Serve the uploads folder as static content
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Enable routes for the account API
app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/burrow", burrowRoutes);
app.use("/api/genre", genreRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/favourite", favouriteRoutes);
app.use("/api/payment", paymentRoutes);

console.clear();

// Listen for incoming requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
