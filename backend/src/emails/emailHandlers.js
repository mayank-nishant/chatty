import { resendClient, formattedSender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "../emails/emailTemplates.js";
import "dotenv/config";

const EMAIL_SUBJECT = "Welcome to Chatty!";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  try {
    if (typeof email !== "string" || typeof name !== "string" || typeof clientURL !== "string") {
      throw new Error("Invalid email input types");
    }

    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedName = name.trim();
    const sanitizedClientURL = clientURL.trim();

    if (!sanitizedEmail || !sanitizedName) {
      throw new Error("Email and name are required");
    }

    const { data, error } = await resendClient.emails.send({
      from: formattedSender,
      to: sanitizedEmail,
      subject: EMAIL_SUBJECT,
      html: createWelcomeEmailTemplate(sanitizedName, sanitizedClientURL),
    });

    if (error) {
      console.error("Resend welcome email error:", error);

      throw new Error(error.message || "Failed to send welcome email");
    }

    console.log(`Welcome email sent successfully to ${sanitizedEmail}`);

    return data;
  } catch (error) {
    console.error("sendWelcomeEmail service error:", error.message);

    throw error;
  }
};
