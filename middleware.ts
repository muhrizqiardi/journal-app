import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/entries")) {
    if (!request.headers.has("Authorization"))
      return NextResponse.rewrite(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/api/users")) {
    if (request.method === "POST") return NextResponse.next();

    if (!request.headers.has("Authorization"))
      // no longer works
      // return NextResponse.json({ message: "Auth required" }, { status: 401 });
      return NextResponse.rewrite(new URL("/api/401", request.url));
  }

  return NextResponse.next();
}
