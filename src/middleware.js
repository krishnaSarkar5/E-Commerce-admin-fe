import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];

export default middleware = (request) => {
  const token = request.cookies.get("token");

  console.log("+++ ", token);
  if (!token && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteUrl = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl);
  }

  if (token && request.nextUrl.pathname === "/login") {
    //TODO need to validate the token is expired or not , if expired then redirect to login page
    const absoluteUrl = new URL("/dashboard", request.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl);
  }
};
