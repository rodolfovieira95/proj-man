import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await auth();

  if (pathname.startsWith("/dashboard")) {
    if (!session?.user) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  if (pathname === "/" || (pathname === "/login" && session?.user)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/project/:path*"],
};
