import { ServerTrollToClientTroll, getTroll } from "@/lib/trollcall/troll";
import { ServerTroll } from "@/types/troll";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { user: string; troll: string } }
) {
  return NextResponse.json(
    await ServerTrollToClientTroll(
      (await getTroll(params.user, params.troll)) as ServerTroll
    )
  );
}
