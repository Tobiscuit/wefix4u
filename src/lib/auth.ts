import { betterAuth } from "better-auth";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URI,
});

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
  webauthn: {
    enabled: true,
    rpID: process.env.NEXT_PUBLIC_SERVER_URL ? new URL(process.env.NEXT_PUBLIC_SERVER_URL).hostname : "localhost",
    rpName: "We Fix 4U",
  },
  trustedOrigins: [process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"],
});
