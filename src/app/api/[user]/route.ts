import { getUser } from "@/lib/trollcall/user";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { user: string } }
) {
  return NextResponse.json(await getUser(params.user));
}
