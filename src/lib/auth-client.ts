import { createAuthClient } from "better-auth/react";
// Passkey (WebAuthn) support is built-in to the core better-auth client in recent versions or requires a plugin.
// Based on docs and package structure, we will use the core client which often exposes passkey methods if enabled on server.
// However, if a specific client plugin is needed (like '@better-auth/passkey/client'), it would be imported here.
// Since we cannot install new packages, we will try to use the core client's capabilities.
// If 'passkeyClient' from '@better-auth/passkey/client' existed, we would use:
// import { passkeyClient } from "@better-auth/passkey/client";
// plugins: [passkeyClient()]

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

export const { useSession, signIn, signOut, signUp } = authClient;
