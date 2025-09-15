import { auth } from "@/lib/auth"; // Adjust path
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
