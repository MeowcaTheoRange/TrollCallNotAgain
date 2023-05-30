import { TrueSign, TrueSignType } from "@/types/assist/extended_zodiac";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { sway: string } }
) {
  return NextResponse.json(
    Object.fromEntries(
      Object.entries(TrueSign).filter(([k, v]: [string, TrueSignType]) => {
        return v.sway.name === params.sway;
      })
    )
  );
}
