
import { NextResponse, NextRequest } from "next/server";
import { authHelpers } from "./utils/helper/middlewareHelpers";

export async function middleware(request: NextRequest) {
  console.log(" ::::::::::::::::::::::::::middleware.ts: Request URL", request.url);
  const { pathname } = request.nextUrl;
  const { cookies } = await import("next/headers");
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll().map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");
  const access_token = allCookies.split("; ").find((cookie) => cookie.startsWith("access_token="))?.split("=")[1];
  const refresh_token = allCookies.split("; ").find((cookie) => cookie.startsWith("refresh_token="))?.split("=")[1];
  const username = allCookies.split("; ").find((cookie) => cookie.startsWith("username="))?.split("=")[1];

  let userInfoResponse, userInfo;
  if (access_token) {
    userInfoResponse = await fetch(new URL("/api/userInfo", request.url), {
      method: "GET",
      headers: {
        Cookie: allCookies || "",
      },
    });
    if (!userInfoResponse.ok) {
      return authHelpers.clearAuthAndRedirect(request, "/signin", access_token);
    }
    userInfo = await userInfoResponse.json();
  }

  if (!access_token && refresh_token && username) {
    const refreshResult = await authHelpers.refreshAccessToken(refresh_token, username);
    if (refreshResult) {
      return refreshResult.response;
    } else {
      return authHelpers.clearAuthAndRedirect(request, "/signin");
    }
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname === "/signin" && access_token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/dashboard") && !access_token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (pathname.startsWith("/dashboard")) {
    const role = userInfo.data.role;
    if (role !== "company") {
      return await authHelpers.clearAuthAndRedirect(request, "/signin", access_token);
    } else {
      console.log("middleware.ts: User is authorized for the dashboard");
      return NextResponse.next();
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/", "/dashboard/:path*",],
};