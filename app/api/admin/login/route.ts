import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Verify against configured admin credentials
    if (username === "MFASCC@125" && password === "myfirstcalculator*135") {
      const response = NextResponse.json({ success: true, message: "Authenticated successfully" });
      
      // Set secure HTTP-only admin session cookie
      response.cookies.set("admin_session", "authenticated_admin_token_125_135", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid admin username or password" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Server authentication error" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.delete("admin_session");
  return response;
}
