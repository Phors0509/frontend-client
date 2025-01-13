import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "../const/api-endpoints";

export const authHelpers = {
  refreshAccessToken: (refresh_token: string, username: string) => {
    return fetch(
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
    )
      .then(response => {
        if (!response.ok) {
          throw new Error("Token refresh failed");
        }
        return response.json();
      })
      .then(data => {
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
      })
      .catch(error => {
        console.error("Failed to refresh tokens:", error);
        return null;
      });
  },

  /**
   * Clears all authentication cookies and signs out user
   */
  clearAuthAndRedirect: (req: NextRequest, redirectUrl: string, access_token?: string) => {
    const signOutPromise = access_token
      ? fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/signout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }).catch(error => {
        console.error("Failed to sign out:", error);
      })
      : Promise.resolve();

    return signOutPromise.then(() => {
      const response = NextResponse.redirect(new URL(redirectUrl, req.url));
      req.cookies.getAll().forEach(cookie => {
        response.cookies.set(cookie.name, "", { expires: new Date(0) });
      });
      return response;
    });
  },
  // getMe : (response : NextResponse)=> {
  //   return fetch(`${API_ENDPOINTS.USER_PROFILE}/me`, {
  //     method: "GET",
  //   })
  //     .then(response => {
  //       if (response === null || []) {
  //         return NextResponse.redirect(new URL("/dashboard/chart", request.url));
  //         throw new Error("Failed to fetch user details");

  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       return data;
  //     })
  //     .catch(error => {
  //       console.error("Failed to fetch user details:", error);
  //       return null;
  //     });

  // }
};
