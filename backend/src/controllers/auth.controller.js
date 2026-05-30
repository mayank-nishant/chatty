import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import User from "../models/User.js";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";

const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 100;
const BCRYPT_ROUNDS = 10;

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (typeof fullName !== "string" || typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ success: false, message: "Invalid input types." });
    }

    const sanitizedName = fullName.trim();
    const sanitizedEmail = email.trim().toLowerCase();

    if (!sanitizedName || !sanitizedEmail || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    if (sanitizedName.length < 2 || sanitizedName.length > 64) {
      return res.status(400).json({
        success: false,
        message: "Full name must be between 2 and 64 characters.",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    if (password.length < PASSWORD_MIN_LENGTH || password.length > PASSWORD_MAX_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters.`,
      });
    }

    const existingUser = await User.findOne({ email: sanitizedEmail }).lean();

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const newUser = await User.create({
      fullName: sanitizedName,
      email: sanitizedEmail,
      password: hashedPassword,
    });

    generateToken(newUser._id, res);

    try {
      await sendWelcomeEmail(newUser.email, newUser.fullName, process.env.CLIENT_URL);
    } catch (error) {
      console.error("Failed to send welcome email:", error);
    }

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      },
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(" ") });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    console.error("Error in signup controller:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid input types.",
      });
    }

    const sanitizedEmail = email.trim().toLowerCase();

    if (!sanitizedEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email: sanitizedEmail }).select("+password");

    const isPasswordCorrect = user ? await bcrypt.compare(password, user.password) : false;

    if (!user || !isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const logout = (_req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
};
