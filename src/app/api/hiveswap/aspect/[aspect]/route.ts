import { Aspect } from "@/types/assist/extended_zodiac";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { aspect: string } }
) {
  return NextResponse.json(Aspect[params.aspect]);
}
