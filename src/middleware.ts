import { NextResponse, NextRequest } from "next/server";
import { authHelpers } from "./utils/helper/middlewareHelpers";

export async function middleware(request: NextRequest) {
  console.log("Middleware: Request URL", request.url);

  try {
    const { pathname } = request.nextUrl;
    const allCookies = request.headers.get("cookie") || "";
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
      const role = userInfo?.data?.role;
      if (role !== "company") {
        return authHelpers.clearAuthAndRedirect(request, "/signin", access_token);
      } else {
        console.log("Middleware: User is authorized for the dashboard");
        return NextResponse.next();
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/error", request.url));
  }
}

export const config = {
  matcher: ["/signin", "/", "/dashboard/:path*"],
};
