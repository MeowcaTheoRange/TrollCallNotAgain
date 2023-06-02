import { ServerTrollToClientTroll, getTrollByID } from "@/lib/trollcall/troll";
import { ServerTroll } from "@/types/troll";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { troll: string } }
) {
  return NextResponse.json(
    await ServerTrollToClientTroll(
      (await getTrollByID(params.troll)) as ServerTroll
    )
  );
}
