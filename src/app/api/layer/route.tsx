import jwt from "jsonwebtoken";
import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";

const secretKey = process.env.NEXTAUTH_SECRET;

if (!secretKey) {
  console.error(
    "Secret key is missing. Make sure to set it in the environment variable."
  );
  process.exit(1);
}

interface TokenData {
  // Define the structure of your token payload
  // For example, if your token includes a user ID and username:
  userId: string;
  username: string;
}

function generateToken(data: TokenData): string {
  return jwt.sign(data, secretKey, { expiresIn: "1h" });
}

function verifyToken(token: string): TokenData | null {
  try {
    const decoded = jwt.verify(token, secretKey) as TokenData;
    return decoded;
  } catch (error) {
    return null;
  }
}
function protectRoute(req: any) {
  const token: any = req.headers.authorization;

  if (!token) {
    throw new Error("Authorization token is missing");
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    throw new Error("Invalid token");
  }

  req.user = decoded;

  return true;
}

export async function GET(request: Request) {
  try {
    //protectRoute(request);
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (!type) throw new Error("type is required");

    const map: any = await sql`SELECT * FROM Map WHERE type = ${type};`;

    if (map) {
      const rows = map?.rows;
      return NextResponse.json({ rows }, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    //protectRoute(req);
    const { text, lat, lon, type } = await req.json();

    if (!text || !lat || !lon || !type) {
      return NextResponse.json({ message: "Invalid Input" }, { status: 409 });
    }

    const result: any = await sql`
      INSERT INTO Map (text, lat, lon, type)
      VALUES (${text}, ${lat}, ${lon}, ${type})
      RETURNING *;`;

    if (result.rows.length === 1) {
      const user = result.rows[0];
      return NextResponse.json(
        { message: "success", data: user },
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
