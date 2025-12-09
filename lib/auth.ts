import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/database"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";
import { schema } from "@/database/schema";
import { Resend } from "resend";
import ForgotPasswordEmail from "@/components/emails/reset-password";
import VerifyEmail from "@/components/emails/verify-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "mysql", // or "mysql", "sqlite"
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    sendResetPassword: async ({ user, url }) => {
      // console.log("Attempting to send reset password email to:", user.email);
      // console.log("Reset URL:", url);
      // if (!process.env.RESEND_API_KEY) {
      //   console.error("RESEND_API_KEY is missing");
      //   return;
      // }
      try {
        const { data, error } = await resend.emails.send({
          from: "Acme <onboarding@resend.dev>",
          to: user.email,
          subject: "Reset Password",
          react: ForgotPasswordEmail({
            userEmail: user.email,
            resetUrl: url,
            username: user.name,
          }), //dari component/emails/forgot-password.tsx
        });

        if (error) {
          console.error("Resend API Error:", error);
        } else {
          console.log("Email sent successfully:", data);
        }
      } catch (error) {
        console.error("Unexpected error sending email:", error);
      }
    },
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Verify Email Address",
        react: VerifyEmail({
          verifyUrl: url,
          username: user.name,
        }), //dari component/emails/verify-email.tsx
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
});
