import { getTroll } from "@/lib/trollcall/troll";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { user: string; troll: string } }
) {
  return NextResponse.json(await getTroll(params.user, params.troll));
}
