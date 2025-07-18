import "server-only";

import { authAdmin } from "../firebaseAdmin";
import { getSession } from "../actions/auth";

export async function verifySession() {
  const session = await getSession();

  if (!session) throw new Error("You are not logged in.");

  return authAdmin.verifySessionCookie(session, true);
}
