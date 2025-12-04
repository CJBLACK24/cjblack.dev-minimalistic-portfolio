import nodemailer from "nodemailer";

// Validate SMTP environment variables
if (!process.env.SMTP_HOST) throw new Error("SMTP_HOST is not set");
if (!process.env.SMTP_USER) throw new Error("SMTP_USER is not set");
if (!process.env.SMTP_PASS) throw new Error("SMTP_PASS is not set");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: `"CJ Black Portfolio" <${
        process.env.SMTP_FROM || process.env.SMTP_USER
      }>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
}

export async function verifyEmailConnection() {
  try {
    await transporter.verify();
    console.log("✅ SMTP connection verified");
    return true;
  } catch (error) {
    console.error("❌ SMTP connection failed:", error);
    return false;
  }
}
