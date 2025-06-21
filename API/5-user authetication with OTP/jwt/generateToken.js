// File: jwt/generateToken.js

const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = generateToken;

// This function generates a JWT token for the user with a 1-hour expiration time.
