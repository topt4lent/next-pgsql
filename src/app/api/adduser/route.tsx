import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const username = searchParams.get("username");
  const password = searchParams.get("password");
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const key = searchParams.get("key");

  try {
    if (
      !key ||
      key !== "top" ||
      !username ||
      !username ||
      !password ||
      !name ||
      !email
    )
      throw new Error("Pet and owner names required");
    await sql`INSERT INTO Users (Username, Password, Name, Email) VALUES (${username}, ${password},${name},${email});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const pets = await sql`SELECT * FROM Users;`;
  return NextResponse.json({ pets }, { status: 200 });
}
