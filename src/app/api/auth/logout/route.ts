import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/constants";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.delete(SESSION_COOKIE_NAME);

  return response;
}
