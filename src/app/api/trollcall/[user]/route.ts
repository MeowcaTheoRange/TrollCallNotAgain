import { ServerUserToClientUser, getUser } from "@/lib/trollcall/user";
import { ServerUser } from "@/types/user";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { user: string } }
) {
  return NextResponse.json(
    await ServerUserToClientUser((await getUser(params.user)) as ServerUser)
  );
}
