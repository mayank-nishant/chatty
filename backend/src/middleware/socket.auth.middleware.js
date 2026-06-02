import jwt from "jsonwebtoken";
import User from "../models/User.js";
import "dotenv/config";

const COOKIE_NAME = "jwt";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const cookies = socket.handshake.headers.cookie;

    if (!cookies) {
      return next(new Error("Unauthorized - No cookies"));
    }

    const token = cookies
      .split("; ")
      .find((c) => c.startsWith(`${COOKIE_NAME}=`))
      ?.split("=")[1];

    if (!token) {
      return next(new Error("Unauthorized - No token"));
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      const message = err instanceof jwt.TokenExpiredError ? "Unauthorized - Token expired" : "Unauthorized - Invalid token";
      return next(new Error(message));
    }

    if (!decoded?.userId) {
      return next(new Error("Unauthorized - Invalid token payload"));
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return next(new Error("Unauthorized - User not found"));
    }

    socket.user = user;
    socket.userId = user._id.toString();

    if (process.env.NODE_ENV === "development") {
      console.info(`Socket authenticated: ${user.fullName} (${user._id})`);
    }

    next();
  } catch (error) {
    console.error("Socket authentication error:", error.message);
    next(new Error("Unauthorized - Authentication failed"));
  }
};
