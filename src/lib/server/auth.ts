import "server-only";

import { authAdmin } from "../firebaseAdmin";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/constants";

export async function getDecodedSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!session) return null;

  return authAdmin.verifySessionCookie(session, true);
}

export async function verifySession() {
  const session = await getDecodedSession();
  if (!session) throw new Error("You are not logged in.");
  return session;
}
