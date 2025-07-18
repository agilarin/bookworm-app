import "server-only";

import { authAdmin } from "../firebaseAdmin";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/constants";

export async function verifySession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!session) throw new Error("You are not logged in.");

  return authAdmin.verifySessionCookie(session, true);
}
