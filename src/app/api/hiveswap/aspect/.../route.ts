import { Aspect } from "@/types/assist/extended_zodiac";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json(Aspect);
}
