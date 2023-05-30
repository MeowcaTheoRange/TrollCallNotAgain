import { SignColor } from "@/types/assist/extended_zodiac";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { color: string } }
) {
  return NextResponse.json(SignColor[params.color]);
}
