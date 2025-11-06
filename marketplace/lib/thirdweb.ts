/**
 * Thirdweb client configuration
 */

import { createThirdwebClient } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!clientId) {
  throw new Error(
    "Missing NEXT_PUBLIC_THIRDWEB_CLIENT_ID environment variable. " +
    "Please add it to your .env.local file. " +
    "Get your client ID from https://thirdweb.com/dashboard/settings/api-keys"
  );
}

export const client = createThirdwebClient({
  clientId,
});

// Server-side client (only used in API routes)
export const serverClient = createThirdwebClient({
  secretKey: process.env.THIRDWEB_SECRET_KEY || clientId,
});

