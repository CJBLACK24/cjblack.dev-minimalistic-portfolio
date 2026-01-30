/* eslint-disable @typescript-eslint/no-unused-vars */
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { magicLink } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { sendEmail } from "./email";

// Validate environment variables (only strict check in production runtime)
const isBuildTime = process.env.NEXT_PHASE === "phase-production-build";

if (!process.env.BETTER_AUTH_SECRET && !isBuildTime) {
  throw new Error("BETTER_AUTH_SECRET is not set");
}

if (!process.env.BETTER_AUTH_URL && !isBuildTime) {
  throw new Error("BETTER_AUTH_URL is not set");
}

if (!process.env.DATABASE_URL && !isBuildTime) {
  throw new Error("DATABASE_URL is not set");
}

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "build-time-secret-placeholder",
  siteUrl: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: ["http://localhost:3000", "http://127.0.0.1:3000"],

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    requireEmailVerification: true, // Enable since we have email setup

    // Password reset configuration
    sendResetPassword: async ({ user, url, token }, request) => {
      try {
        console.log(`📧 Sending password reset email to: ${user.email}`);
        console.log(`👉 Reset Link: ${url}`);
        await sendEmail({
          to: user.email,
          subject: "Reset Your Password - cjblack.dev Portfolio",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">Password Reset Request</h2>
              <p>Hello ${user.name},</p>
              <p>You requested to reset your password for cjblack.dev Portfolio. Click the button below to create a new password:</p>
              <a href="${url}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 16px 0;">
                Reset Password
              </a>
              <p>This link will expire in 1 hour.</p>
              <p>If you didn't request this, please ignore this email.</p>
              <hr style="margin: 24px 0;">
              <p style="color: #666; font-size: 14px;">Christian John Calderon Duque - Portfolio</p>
            </div>
          `,
          text: `Reset your password: ${url}`,
        });
        console.log(
          `✅ Password reset email sent successfully to: ${user.email}`,
        );
      } catch (error) {
        console.error(
          `❌ Failed to send password reset email to ${user.email}:`,
          error,
        );
        throw error; // Re-throw to let Better Auth handle it
      }
    },

    onPasswordReset: async ({ user }, request) => {
      console.log(`Password reset for user: ${user.email}`);
      // Add any additional logic like logging or notifications
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        console.log(`📧 Sending email verification to: ${user.email}`);
        console.log(`👉 Verification Link: ${url}`);

        // Append callbackURL to redirect to sign-up page after verification
        const verifyUrl = new URL(url);
        verifyUrl.searchParams.set("callbackURL", "/sign-up");
        const finalUrl = verifyUrl.toString();

        await sendEmail({
          to: user.email,
          subject: "Verify Your Email - cjblack.dev Portfolio",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">Welcome to My Portfolio!</h2>
              <p>Hello ${user.name},</p>
              <p>Thank you for joining my portfolio community. Please verify your email address by clicking the button below:</p>
              <a href="${finalUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 16px 0;">
                Verify Email
              </a>
              <p>This link will expire in 24 hours.</p>
              <hr style="margin: 24px 0;">
              <p style="color: #666; font-size: 14px;">Christian John Calderon Duque<br>Full Stack Developer</p>
            </div>
          `,
          text: `Verify your email: ${finalUrl}`,
        });
        console.log(
          `✅ Email verification sent successfully to: ${user.email}`,
        );
      } catch (error) {
        console.error(
          `❌ Failed to send email verification to ${user.email}:`,
          error,
        );
        throw error; // Re-throw to let Better Auth handle it
      }
    },
  },

  plugins: [
    nextCookies(),
    magicLink({
      sendMagicLink: async ({ email, url, token }, request) => {
        await sendEmail({
          to: email,
          subject: "Log in to Christian's Portfolio",
          html: `
            <div style="background-color: #000; color: #fff; font-family: 'Inter', Arial, sans-serif; padding: 40px 20px; line-height: 1.6;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #0a0a0a; border: 1px solid #222; border-radius: 12px; padding: 40px; text-align: left;">
                <h1 style="color: #fff; font-size: 24px; font-weight: 700; margin-bottom: 24px; font-family: 'Sports', sans-serif;">CJBLACK</h1>
                
                <p style="color: #d1d5db; font-size: 16px; margin-bottom: 30px;">Hi developer,</p>
                
                <p style="color: #d1d5db; font-size: 16px; margin-bottom: 32px;">Simply click the link below, and you'll be logged in automatically:</p>
                
                <div style="text-align: center; margin-bottom: 40px;">
                  <a href="${url}" style="background-color: #2FA4FF; color: #fff; padding: 14px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; transition: background-color 0.3s ease;">
                    Log In →
                  </a>
                </div>
                
                <p style="color: #6b7280; font-size: 14px; margin-bottom: 32px;">For security purposes, this link will expire in 24 hours and can only be used once. If you didn't request this link, please ignore this email or let us know immediately.</p>
                
                <div style="border-t: 1px solid #222; padding-top: 24px;">
                  <p style="color: #9ca3af; font-size: 15px; margin-bottom: 4px;">Best regards,</p>
                  <p style="color: #fff; font-size: 16px; font-weight: 600; margin: 0;">The CJBLACK</p>
                </div>
              </div>
              <div style="text-align: center; margin-top: 24px;">
                <p style="color: #4b5563; font-size: 12px;">© 2024 Christian John Calderon Duque. All rights reserved.</p>
              </div>
            </div>
          `,
          text: `Log in to your account: ${url}`,
        });
      },
    }),
  ],
  trustHost: true,
});

export type Auth = typeof auth;
