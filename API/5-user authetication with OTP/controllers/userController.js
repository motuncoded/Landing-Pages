//user Controller

const userModel = require("../models/userModel");
const { hashPassword } = require("../utils/hashPassword");
const generateToken = require("../jwt/generateToken");
const crypto = require("crypto");
const { sendEmail } = require("../utils/sendEmail");
const generateOtp = require("../utils/generateOtp");
const validator = require("validator");
const bcrypt = require("bcrypt");

// create a user
const register = async (req, res, next) => {
  const { email, firstName, lastName, phone, password } = req.body;

  if (!email || !firstName || !lastName || !phone || !password) {
    return res.status(400).json({ message: "Please provide all details" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashed = await hashPassword(password);
    const otp = generateOtp();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    const newUser = new userModel({
      email,
      firstName,
      lastName,
      phone,
      password: hashed,
      otp,
      otpExpires,
      isVerified: false,
    });
    await newUser.save();

    await sendEmail(
      email,
      "Your OTP for Verification",
      `<p>Your OTP is: <b>${otp}</b></p>`,
    );

    res.status(201).json({
      newUser,
      message: "User registered successfully. Check your email for OTP.",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Verify OTP
const verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (
      String(user.otp) !== String(otp) ||
      !user.otpExpires ||
      user.otpExpires < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    user.otp = undefined;
    user.otpExpires = undefined;
    user.isVerified = true;
    await user.save();
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    next(error);
  }
};

// log in a user
const login = async (req, res, next) => {
  //  Extract Email & Password from the Request Body
  const { email, password } = req.body;

  try {
    // Find User in the Database
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Account not found, please register with us" });
    }
    //  Compare Hashed Passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password or email incorrect" });
    }
    //  Generate a JWT Token
    const token = generateToken(user._id);
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

// reset password
const requestPasswordReset = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send OTP to email
    await sendEmail(
      email,
      "Password Reset OTP",
      `<p>Your OTP for resetting your password is: <b>${otp}</b></p>`,
    );

    res.json({ message: "OTP sent to email", otp });
  } catch (error) {
    next(error);
  }
};

// Verify Reset OTP
const verifyResetOtp = async (req, res, next) => {
  const { otp, email } = req.body;

  if (!otp && !email)
    return res.status(400).json({ message: "OTP and email are required" });

  try {
    const user = await userModel.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() },
    });
    if (!user)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    // Generate a reset token (short-lived)
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Clean up OTP
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Create reset link
    const resetLink = `${req.protocol}://${req.get("host")}/api/auth/reset-password/${resetToken}`;

    // Send reset link to email
    await sendEmail(
      email,
      "Password Reset email",
      `<p>Your reset link for resetting your password is: <b>${resetLink}</b></p>`,
    );

    res.json({
      resetLink,
      message: "OTP verified. Password reset link generated.",
    });
  } catch (error) {
    next(error);
  }
};

//reset-password
// Reset Password with Token from Link
const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  try {
    // Validate passwords match
    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    // Find user by token and check expiration
    const user = await userModel.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password and clear reset token
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // await sendPasswordChangedEmail(user.email);

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NOD_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  register,
  verifyOtp,
  login,
  logout,
  requestPasswordReset,
  verifyResetOtp,
  resetPassword,
};
