import { Class } from "@/types/assist/extended_zodiac";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { class: string } }
) {
  return NextResponse.json(Class[params.class]);
}
