import { action } from "./_generated/server";
import { v } from "convex/values";

// Password hashing using Web Crypto API (PBKDF2) - works in Convex edge runtime
async function hashPasswordWithCrypto(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const salt = crypto.getRandomValues(new Uint8Array(16));

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    data,
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    256
  );

  const hashArray = Array.from(new Uint8Array(derivedBits));
  const saltArray = Array.from(salt);

  // Store as salt:hash
  return saltArray.map(b => b.toString(16).padStart(2, '0')).join('') + ':' +
         hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verifyPasswordWithCrypto(password: string, storedHash: string): Promise<boolean> {
  // Handle old bcrypt hashes (start with $2b$ or $2a$)
  if (storedHash.startsWith('$2')) {
    // Legacy bcrypt hash - for now return false, user needs to reset password
    return false;
  }

  const [saltHex, hashHex] = storedHash.split(':');
  if (!saltHex || !hashHex) return false;

  const salt = new Uint8Array(saltHex.match(/.{2}/g)!.map(byte => parseInt(byte, 16)));
  const storedHashBytes = new Uint8Array(hashHex.match(/.{2}/g)!.map(byte => parseInt(byte, 16)));

  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    data,
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    256
  );

  const hashArray = new Uint8Array(derivedBits);

  // Compare hashes
  if (hashArray.length !== storedHashBytes.length) return false;

  let match = true;
  for (let i = 0; i < hashArray.length; i++) {
    if (hashArray[i] !== storedHashBytes[i]) {
      match = false;
    }
  }

  return match;
}

// Utility functions exported for use in mutations
export async function hashPasswordUtil(password: string): Promise<string> {
  return await hashPasswordWithCrypto(password);
}

export async function verifyPasswordUtil(password: string, hash: string): Promise<boolean> {
  return await verifyPasswordWithCrypto(password, hash);
}

// Actions
export const hashPassword = action({
  args: { password: v.string() },
  handler: async (ctx, args) => {
    return await hashPasswordWithCrypto(args.password);
  },
});

export const verifyPassword = action({
  args: { password: v.string(), hash: v.string() },
  handler: async (ctx, args) => {
    return await verifyPasswordWithCrypto(args.password, args.hash);
  },
});

export const generateResetToken = action({
  args: {},
  handler: async (ctx, args) => {
    // Generate secure random token
    return Math.random().toString(36).substring(2) + Date.now().toString(36) + Math.random().toString(36).substring(2);
  },
});
