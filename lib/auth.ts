import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb", // optional
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendEmailVerification: true,
    async sendVerificationEmail({ email, url }: { email: string; url: string }) {
      const resend = new (await import("resend")).Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "CDWPhysio <no-reply@cdwphysio.vercel.app>",
        to: email,
        subject: "Verify Your CDWPhysio Account",
        html: `
          <p>Thank you for registering with CDWPhysio!</p>
          <p>Click the link below to verify your email:</p>
          <a href="${url}">Verify Email</a>
          <p>This link expires in 24 hours.</p>
        `,
      });
    },
  },
  // socialProviders: {
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID as string,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  //   },
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID as string,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  //   },
  // },
  user: {
    additionalFields: {
      role: { type: "string", default: "user" },
    },
  },
  plugins: [nextCookies()],
});
