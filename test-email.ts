// Test SMTP connection
import "dotenv/config";
import { verifyEmailConnection, sendEmail } from "./lib/email";

async function testEmail() {
  console.log("🔍 Testing SMTP connection...");

  const verified = await verifyEmailConnection();

  if (verified) {
    console.log("✅ SMTP connection verified!");
    console.log("📧 Attempting to send test email...");

    try {
      await sendEmail({
        to: "duquechristianjohncalderon@gmail.com",
        subject: "Test Email from Portfolio",
        html: "<h1>Test Email</h1><p>If you receive this, SMTP is working!</p>",
        text: "Test Email - If you receive this, SMTP is working!",
      });
      console.log("✅ Test email sent successfully!");
    } catch (error) {
      console.error("❌ Failed to send test email:", error);
    }
  } else {
    console.error("❌ SMTP connection failed!");
  }
}

testEmail();
