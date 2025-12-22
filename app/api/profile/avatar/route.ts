import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const formData = await request.formData();
    const avatar = formData.get("avatar");

    if (!avatar || !(avatar instanceof File)) {
      return NextResponse.json(
        { message: "No avatar file provided" },
        { status: 400 }
      );
    }

    // Create a new FormData for the backend request
    const backendFormData = new FormData();
    backendFormData.append("avatar", avatar);

    const response = await fetch("http://127.0.0.1:8000/api/update-avatar", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: backendFormData,
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Avatar upload proxy error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
