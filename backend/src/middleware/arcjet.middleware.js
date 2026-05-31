import { isSpoofedBot } from "@arcjet/inspect";
import aj from "../lib/arcjet.js";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.results?.some(isSpoofedBot)) {
      return res.status(403).json({
        success: false,
        message: "Spoofed bot detected. Access denied.",
      });
    }

    if (decision.isDenied()) {
      if (decision.reason?.isRateLimit?.()) {
        return res.status(429).json({
          success: false,
          message: "Too many requests. Please try again later.",
        });
      }

      if (decision.reason?.isBot?.()) {
        return res.status(403).json({
          success: false,
          message: "Bot access denied.",
        });
      }

      return res.status(403).json({
        success: false,
        message: "Access denied by security policy.",
      });
    }

    req.arcjet = { decision };
    next();
  } catch (error) {
    console.error("Arcjet protection middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal security middleware error.",
    });
  }
};
