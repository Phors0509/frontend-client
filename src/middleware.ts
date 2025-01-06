
import { NextResponse, NextRequest } from "next/server";
import { authHelpers } from "./utils/helper/middlewareHelpers";

export async function middleware(request: NextRequest) {
  console.log(" ::::::::::::::::::::::::::middleware.ts: Request URL", request.url);
  const { pathname } = request.nextUrl;
  // const { cookies } = await import("next/headers");
  // const cookieStore = cookies();
  // const allCookies = cookieStore.getAll().map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");
  // const access_token = allCookies.split("; ").find((cookie) => cookie.startsWith("access_token="))?.split("=")[1];
  // const refresh_token = allCookies.split("; ").find((cookie) => cookie.startsWith("refresh_token="))?.split("=")[1];
  // const username = allCookies.split("; ").find((cookie) => cookie.startsWith("username="))?.split("=")[1];
  // Access cookies directly from the request
  const access_token = request.cookies.get("access_token")?.value;
  const refresh_token = request.cookies.get("refresh_token")?.value;
  const username = request.cookies.get("username")?.value;

  // console.log("Middleware: access_token", access_token);
  // console.log("Middleware: refresh_token", refresh_token);
  // console.log("Middleware: username", username);
  // console.log("Middleware: pathname", pathname);


  console.log("middleware.ts: access_token::::::::::::::::::::::::::::::", access_token);
  console.log("============================================================");
  console.log("middleware.ts: refresh_token:::::::::::::::::::::::::::::", refresh_token);
  console.log("============================================================");
  console.log("middleware.ts: username::::::::::::::::::::::::::::::::::", username);
  console.log("============================================================");
  // console.log("middleware.ts: allCookies :::::::::::::::::::::::::::::::", allCookies);
  // console.log("============================================================");
  console.log("middleware.ts: pathname::::::::::::::::::::::::::::::::::", pathname);
  console.log("============================================================");

  if (!access_token && refresh_token && username) {
    const refreshResult = await authHelpers.refreshAccessToken(refresh_token, username);
    if (refreshResult) {
      return refreshResult.response;
    } else {
      return authHelpers.clearAuthAndRedirect(request, "/signin");
    }
  }

  if (pathname === "/") {
    // Redirect root path "/" to dashboard chart
    return NextResponse.redirect(new URL("/dashboard/chart", request.url));
  }

  if (pathname === "/signin" && access_token) {
    // Redirect authenticated users trying to access the signin page
    return NextResponse.redirect(new URL("/dashboard/chart", request.url));
  }


  if (pathname.startsWith("/dashboard/") && !access_token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/", "/dashboard/:path*",],
};