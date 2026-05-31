import jwt from "jsonwebtoken";
import User from "../models/User.js";
import "dotenv/config";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token provided.",
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      const message = err instanceof jwt.TokenExpiredError ? "Unauthorized - Token expired." : "Unauthorized - Invalid token.";

      return res.status(401).json({ success: false, message });
    }

    if (!decoded?.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid token payload.",
      });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware : ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
