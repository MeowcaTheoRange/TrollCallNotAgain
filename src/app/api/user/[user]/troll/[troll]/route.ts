import {
  ServerTrollToClientTroll,
  getTrollByName,
} from "@/lib/trollcall/troll";
import { getUserByName } from "@/lib/trollcall/user";
import { ServerTroll } from "@/types/troll";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { troll: string; user: string } }
) {
  var user = await getUserByName(params.user);
  if (user == null) return { notFound: true };
  var troll = await getTrollByName(params.troll, user);
  if (troll == null) return { notFound: true };
  return NextResponse.json(
    await ServerTrollToClientTroll(troll as ServerTroll)
  );
}
