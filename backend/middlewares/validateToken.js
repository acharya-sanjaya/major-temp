const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateTokenMiddleware = async (req, res, next) => {
  try {
    // Retrieve the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({message: "No token provided"});
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    // Check if the user is active
    if (!user.isActive) {
      return res
        .status(404)
        .json({message: "Your account has been suspended", remarks: user.remarks});
    }

    // Add the user information to the request object
    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
      isPro: user.role !== "reader" || user.proExpiry > Date.now(),
    };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Return the error if the token is invalid or the user is not found
    return res.status(401).json({message: "Invalid token", error: error.message});
  }
};

module.exports = validateTokenMiddleware;
