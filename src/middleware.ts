import { NextResponse, NextRequest } from "next/server";
import { authHelpers } from "./utils/helper/middlewareHelpers";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (!url.pathname.endsWith('/')) {
    url.pathname += '/';
    return NextResponse.redirect(url);
  }

  // const pathname = url.pathname;

  // // Get cookies using headers
  // const cookieHeader = request.headers.get('cookie') || '';
  // const access_token = cookieHeader.split('; ').find(c => c.startsWith('access_token='))?.split('=')[1];
  // const refresh_token = cookieHeader.split('; ').find(c => c.startsWith('refresh_token='))?.split('=')[1];
  // const username = cookieHeader.split('; ').find(c => c.startsWith('username='))?.split('=')[1];

  // // Handle token refresh
  // if (!access_token && refresh_token && username) {
  //   const refreshResult = await authHelpers.refreshAccessToken(refresh_token, username);
  //   if (refreshResult) {
  //     return refreshResult.response;
  //   }
  //   return authHelpers.clearAuthAndRedirect(request, "/signin/");
  // }

  // Root redirect
  if (pathname === "/" || pathname === "") {
    return NextResponse.redirect(new URL("/dashboard/chart/", request.url));
  }

  // // Signed in users shouldn't access signin page
  // if (pathname.startsWith("/signin/") && access_token) {
  //   return NextResponse.redirect(new URL("/dashboard/chart/", request.url));
  // }

  // // Protected routes
  // if (pathname.startsWith("/dashboard/") && !access_token) {
  //   return NextResponse.redirect(new URL("/signin/", request.url));
  // }
  // console.log('middleware' + request.url.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match specific routes only
    '/',
    '/signin/:path*',
    '/dashboard/:path*',
  ]
};