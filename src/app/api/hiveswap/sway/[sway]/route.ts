import { Sway } from "@/types/assist/extended_zodiac";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { sway: string } }
) {
  return NextResponse.json(Sway[params.sway]);
}
