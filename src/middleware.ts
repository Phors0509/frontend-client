
import { NextResponse, NextRequest } from "next/server";
import { authHelpers } from "./utils/helper/middlewareHelpers";
import { API_ENDPOINTS } from "./utils/const/api-endpoints";

export async function middleware(request: NextRequest) {
  console.log(" ::::::::::::::::::::::::::middleware.ts: Request URL", request.url);
  const { pathname } = request.nextUrl;
  const access_token = request.cookies.get("access_token")?.value;
  const refresh_token = request.cookies.get("refresh_token")?.value;
  const username = request.cookies.get("username")?.value;


  if (!access_token && refresh_token && username) {
    const refreshResult = authHelpers.refreshAccessToken(refresh_token, username);
    if (refreshResult) {
      return refreshResult;
    } else {
      return authHelpers.clearAuthAndRedirect(request, "/signin");
    }
  }
  // Make an API call to check the response
  const response = await fetch(`${API_ENDPOINTS.CORPARATE_PROFILE_ME}`);
  const data = await response.json();

  if (!data || data.length === 0) {
    return authHelpers.clearAuthAndRedirect(request, "/signin");
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // if (pathname === "/signin" && access_token) {
  //   // Redirect authenticated users trying to access the signin page
  //   return NextResponse.redirect(new URL("/dashboard/chart", request.url));
  // }


  // if (pathname.startsWith("/dashboard/") && !access_token) {
  //   return NextResponse.redirect(new URL("/signin", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/", "/dashboard/:path*",],
};
