const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const token = jwt.sign(
    payload, // user data
    process.env.JWT_SECRET, // secret kwy
    {
      expiresIn: process.env.JWT_EXPIRATION,
    } // options
  );

  return token;
};

module.exports = {generateToken};
