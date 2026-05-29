import { Resend } from "resend";
import "dotenv/config";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is missing");
}

export const resendClient = new Resend(process.env.RESEND_API_KEY);

export const sender = Object.freeze({
  email: process.env.EMAIL_FROM,
  name: process.env.EMAIL_FROM_NAME ?? "Chatty",
});

export const formattedSender = `${sender.name} <${sender.email}>`;
