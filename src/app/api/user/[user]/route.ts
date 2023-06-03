import { ServerUserToClientUser, getUserByName } from "@/lib/trollcall/user";
import { ServerUser } from "@/types/user";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { user: string } }
) {
  var user = await getUserByName(params.user);
  if (user == null) return { notFound: true };
  return NextResponse.json(await ServerUserToClientUser(user as ServerUser));
}
