import { SESSION_COOKIE_MAX_AGE, SESSION_COOKIE_NAME } from "@/constants";
import { authAdmin } from "@/lib/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod/v4";

const LoginApiSchema = z.object({
  idToken: z.string().trim(),
});

export async function POST(request: NextRequest) {
  const { idToken } = LoginApiSchema.parse(await request.json());

  if (!idToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const sessionCookie = await authAdmin.createSessionCookie(idToken, {
      expiresIn: SESSION_COOKIE_MAX_AGE,
    });

    const response = NextResponse.json({ success: true });

    response.cookies.set(SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + SESSION_COOKIE_MAX_AGE),
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}
