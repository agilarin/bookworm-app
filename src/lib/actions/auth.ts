"use server";

import { SESSION_COOKIE_MAX_AGE, SESSION_COOKIE_NAME } from "@/constants";
import { authAdmin } from "../firebaseAdmin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// export async function setSession(idToken: string) {
//   const cookiesStore = await cookies();

//   if (!idToken) {
//     return { success: false, error: "Invalid token" };
//   }
//   try {
//     const sessionCookie = await authAdmin.createSessionCookie(idToken, {
//       expiresIn: SESSION_COOKIE_MAX_AGE,
//     });

//     cookiesStore.set(SESSION_COOKIE_NAME, sessionCookie, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       expires: new Date(Date.now() + SESSION_COOKIE_MAX_AGE),
//       sameSite: "lax",
//       path: "/",
//     });

//     return { success: true };
//   } catch {
//     return { success: false, error: "Invalid token" };
//   }
// }

export async function getSession() {
  const cookieStore = await cookies();

  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}

// export async function deleteSession() {
//   const cookiesStore = await cookies();

//   cookiesStore.delete(SESSION_COOKIE_NAME);

//   redirect("/");
// }
