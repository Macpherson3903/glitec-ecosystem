import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const JOB_ADMIN_COOKIE = "job_admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function getSigningSecret() {
  return process.env.JOB_ADMIN_SECRET || process.env.JOB_ADMIN_PASSWORD || "";
}

function dummyCompare() {
  const buf = Buffer.alloc(32);
  timingSafeEqual(buf, buf);
}

export function passwordsMatch(input) {
  const expected = process.env.JOB_ADMIN_PASSWORD || "";
  const a = Buffer.from(String(input ?? ""), "utf8");
  const b = Buffer.from(expected, "utf8");

  if (!expected || a.length !== b.length) {
    dummyCompare();
    return false;
  }

  return timingSafeEqual(a, b);
}

function sign(payload) {
  const secret = getSigningSecret();
  if (!secret) return "";
  return createHmac("sha256", secret).update(payload).digest("hex");
}

function hexEqual(a, b) {
  try {
    const ba = Buffer.from(a, "hex");
    const bb = Buffer.from(b, "hex");
    if (ba.length !== bb.length || ba.length === 0) return false;
    return timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}

export function createSessionToken() {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
  const payload = String(exp);
  const sig = sign(payload);
  if (!sig) return "";
  return `${payload}.${sig}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== "string") return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = sign(payload);
  if (!expected || !hexEqual(sig, expected)) return false;
  const exp = Number(payload);
  return Number.isFinite(exp) && exp > Date.now() / 1000;
}

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  };
}

export async function isJobAdminAuthenticated() {
  const jar = await cookies();
  return verifySessionToken(jar.get(JOB_ADMIN_COOKIE)?.value);
}

export async function setJobAdminCookie() {
  const token = createSessionToken();
  if (!token) {
    throw new Error("Job admin signing secret is not configured");
  }
  const jar = await cookies();
  jar.set(JOB_ADMIN_COOKIE, token, cookieOptions());
}

export async function clearJobAdminCookie() {
  const jar = await cookies();
  jar.set(JOB_ADMIN_COOKIE, "", {
    ...cookieOptions(),
    maxAge: 0,
  });
}
