import {betterAuth} from "better-auth";
import {mongodbAdapter} from "better-auth/adapters/mongodb";
import clientPromise from "@/dump/db";

// Connect to the database and get the Db instance
const getDb = async () => {
  const client = await clientPromise;
  return client.db(); // Uses the database name from MONGODB_URI
};

const dbPromise = getDb();

export const auth = betterAuth({
  database: mongodbAdapter(await dbPromise), // Pass the Db instance
  emailAndPassword: {
    enabled: true, // For user sign-in
    // Add custom validation if needed for medical credentials
  },
  // Enable roles for admin approvals and study access
  plugins: [
    // Example: Add role plugin if needed (check Better Auth docs for full list)
    // betterAuth.plugins.roles(),
  ],
  // Additional config for your project, e.g., custom user fields for medical profiles
  user: {
    additionalFields: {
      role: {
        type: "string", // e.g., 'user', 'admin'
        default: "user",
      },
      approved: {
        type: "boolean", // For admin approval before data access
        default: false,
      },
    },
  },
  // ... other options like social providers if needed
});
