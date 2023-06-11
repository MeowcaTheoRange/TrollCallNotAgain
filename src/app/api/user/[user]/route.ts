import { ServerUserToClientUser, getUserByName } from "@/lib/trollcall/user";
import { ServerUser } from "@/types/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { user: string } }
) {
  const authCookies = cookies();
  const [userName, userCode] = [
    authCookies.get("TROLLCALL_NAME")?.value,
    authCookies.get("TROLLCALL_CODE")?.value,
  ];
  var user = await getUserByName(params.user);
  if (user == null) return { notFound: true };
  if (userName === user.name && userCode === user.code)
    return NextResponse.json(user);
  return NextResponse.json(await ServerUserToClientUser(user as ServerUser));
}
