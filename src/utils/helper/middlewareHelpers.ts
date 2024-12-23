import { NextRequest, NextResponse } from "next/server";

export const authHelpers = {
  refreshAccessToken: async (refresh_token: string, username: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refresh_token}`,
          },
          body: JSON.stringify({
            refreshToken: refresh_token,
            username: username,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const data = await response.json();
      const newResponse = NextResponse.next();

      newResponse.cookies.set("access_token", data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      newResponse.cookies.set("id_token", data.id_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return { newTokens: data, response: newResponse };
    } catch (error) {
      console.error("Failed to refresh tokens:", error);
      return null;
    }
  },

  /**
   * Clears all authentication cookies and signs out user
   */
  clearAuthAndRedirect: async (
    req: NextRequest,
    redirectUrl: string,
    access_token?: string
  ) => {
    try {
      if (access_token) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/signout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
      }
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
    const response = NextResponse.redirect(new URL(redirectUrl, req.url));
    req.cookies.getAll().forEach((cookie) => {
      response.cookies.set(cookie.name, "", { expires: new Date(0) });
    });
    return response;
  },
};
