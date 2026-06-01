import arcjet, { detectBot, shield, slidingWindow } from "@arcjet/node";
import "dotenv/config";

if (!process.env.ARCJET_KEY) {
  throw new Error("ARCJET_KEY is missing in environment variables");
}

const MODE = process.env.ARCJET_ENV === "development" ? "DRY_RUN" : "LIVE";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: MODE }),

    detectBot({
      mode: MODE,
      allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:MONITOR", "CATEGORY:PREVIEW"],
    }),

    slidingWindow({
      mode: MODE,
      interval: 60,
      max: 30,
    }),
  ],
});

export default aj;
