
import { NextResponse, NextRequest } from "next/server";
// import { authHelpers } from "./utils/helper/middlewareHelpers";

// export function middleware(request: NextRequest) {
//   console.log(" ::::::::::::::::::::::::::middleware.ts: Request URL", request.url);
//   const { pathname } = request.nextUrl;
//   const access_token = request.cookies.get("access_token")?.value;
//   const refresh_token = request.cookies.get("refresh_token")?.value;
//   const username = request.cookies.get("username")?.value;

//   if (!access_token && refresh_token && username) {
//     const refreshResult = authHelpers.refreshAccessToken(refresh_token, username);
//     if (refreshResult) {
//       return refreshResult;
//     } else {
//       return authHelpers.clearAuthAndRedirect(request, "/signin");
//     }
//   }

//   if (pathname === "/") {
//     // Redirect root path "/" to dashboard chart
//     return NextResponse.redirect(new URL("/dashboard/chart", request.url));
//   }

//   // if (pathname === "/signin" && access_token) {
//   //   // Redirect authenticated users trying to access the signin page
//   //   return NextResponse.redirect(new URL("/dashboard/chart", request.url));
//   // }


//   // if (pathname.startsWith("/dashboard/") && !access_token) {
//   //   return NextResponse.redirect(new URL("/signin", request.url));
//   // }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/signin", "/", "/dashboard/:path*",],
// };

export function middleware(request: NextRequest) {
  const access_token = request.cookies.get("access_token")?.value;
  const refresh_token = request.cookies.get("refresh_token")?.value;
  const username = request.cookies.get("username")?.value;

  if (!access_token && refresh_token && username) {
    // Attempt refresh logic or clear auth
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (!access_token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/", "/dashboard/:path*"],
};
