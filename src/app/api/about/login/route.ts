import { readOne } from "@/lib/mongodb/crud";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body: { name: string; code: string } = await request.json();
  const user = await readOne("users", {
    name: body.name.toLowerCase(),
    code: body.code,
  });
  if (user != null) return NextResponse.json(user);
  return new Response("User does not exist or code is incorrect", {
    status: 400,
  });
}
