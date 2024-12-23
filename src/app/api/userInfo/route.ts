import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/corporator/profile/me`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: req.headers.get("cookie") || "",
        },
      }
    );
    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch user info" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("========================================");
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching user info", error: error.message },
      { status: 500 }
    );
  }
}
