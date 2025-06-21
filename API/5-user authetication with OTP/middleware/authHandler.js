// Authentication Middleware

const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// regular user
const userHandler = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token received:", token); // Debug line

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Access denied. Please log in to continue" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); //to verify that token in cookies matches our created token

    console.log("Decoded token ID:", decodedToken); // Debug line

    if (!decodedToken) {
      return res.status(401).json({ msg: "Invalid Token" });
    }

    const userId = decodedToken.id || decodedToken._id;
    if (!userId) {
      return res.status(401).json({ msg: "Token missing user ID" });
    }

    const user = await userModel.findById(userId).select("-password"); //to find a userid that matches the token id
    if (!user) {
      console.log("User lookup failed for ID:", decodedToken.id); // Debug line
      return res.status(401).json({ msg: "User not found" });
    }
    req.user = user; //passing the verified user to the ongoing request
    next();
  } catch (error) {
    console.error("Authentication Error:", error);

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ msg: "Token has expired. Please log in again." });
    }

    return res
      .status(500)
      .json({ msg: "Server error. Please try again later." });
  }
};

module.exports = { userHandler };
// This middleware function checks for a JWT token in the cookies, verifies it, and retrieves the user information.
// If the token is valid, it attaches the user information to the request object and calls the next middleware.
