import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth"; // Adjust path

export const { POST, GET } = toNextJsHandler(auth);
