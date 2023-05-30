import { TrueSign } from "@/types/assist/extended_zodiac";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { sign: string } }
) {
  return NextResponse.json(TrueSign[params.sign]);
}
