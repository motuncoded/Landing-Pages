//User Controller

const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../jwt/generateToken");

//hash function

const hashFunction = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hashSync(password, salt);
};

// Register a user
const register = async (req, res, next) => {
  let { username, password, gmail } = req.body;

  //to trim to remove spaces
  username = username?.trim();
  gmail = gmail?.trim().toLowerCase();

  // Validate input
  if (!username || !password || !gmail) {
    return res.status(400).json({ message: "Please provide all details" });
  }

  try {
    const gmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!gmailRegex.test(gmail)) {
      return res.status(400).json({ message: "Invalid gmail format" });
    }
    const existingUser = await userModel.findOne({ gmail });
    if (existingUser) {
      return res.status(409).json("User already existed");
    }
    const hashedPassword = await hashFunction(password);

    // Create a new user instance
    const newUser = new userModel({ ...req.body, password: hashedPassword });

    // Save the user in the database
    await newUser.save();
    res.status(201).json({ newUser, message: "User registeration suceessful" });
  } catch (error) {
    next(error);
  }
};

//Login a user
const login = async (req, res, next) => {
  //  Extract Email & Password from the Request Body
  const { gmail, password } = req.body;

  try {
    // Find User in the Database
    const user = await userModel.findOne({ gmail });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Account not found, please register with us" });
    }
    //  Compare Hashed Passwords
    const comparison = await bcrypt.compare(password, user.password);
    if (!comparison) {
      return res.status(400).json({ message: "Password or gmail incorrect" });
    }
    //  Generate a JWT Token
    const token = generateToken(user._id);
    console.log("Generated Token:", token);
    // Store the Token in Cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });
    // Remove Password from User Object
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json({
      message: "User logged in successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login
};
