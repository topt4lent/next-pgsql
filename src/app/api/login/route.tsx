import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { sign } from "jsonwebtoken"; // Import the JWT library

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Missing username or password" },
        { status: 400 }
      );
    }

    const result: any = await sql`
      SELECT username, name
      FROM Users
      WHERE Username = ${username} AND Password = ${password}
    `;

    if (result.rowCount === 1) {
      const user = result.rows[0];

      // Assuming you have a secret key for signing the JWT
      const secretKey: any = process.env.NEXTAUTH_SECRET;

      // Sign the JWT token
      const token = sign(
        { username: user.username, name: user.name },
        secretKey
      );

      return NextResponse.json(
        { message: "success", data: user, token },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
