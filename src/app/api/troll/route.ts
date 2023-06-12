import { createOne, replaceOne } from "@/lib/mongodb/crud";
import {
  SubmitTrollToServerTroll,
  getTrollByName,
} from "@/lib/trollcall/troll";
import { getUserByName } from "@/lib/trollcall/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ValidationError } from "yup";

export async function POST(request: Request) {
  const body = await request.json();
  const authCookies = cookies();
  // get user cookies for auth.
  const [userName, userCode] = [
    authCookies.get("TROLLCALL_NAME")?.value,
    authCookies.get("TROLLCALL_CODE")?.value,
  ];
  // make sure user is Real
  if (userName == null)
    return new Response("Not Authenticated", { status: 403 });
  let user = await getUserByName(userName);
  if (user == null) return new Response("Not Authenticated", { status: 403 });
  if (userCode !== user.code)
    return new Response("Code Incorrect", { status: 403 });
  let troll;
  try {
    troll = await SubmitTrollToServerTroll(body, user);
  } catch (err) {
    return new Response((err as Error | ValidationError).message, {
      status: 400,
    });
  }
  // quickly, check if troll with name exists!
  var existingTroll = await getTrollByName(troll.name[0], user);
  if (existingTroll?.name[0] == troll.name[0]) {
    // @ts-ignore dont care
    delete troll._id;
    var newTroll = await replaceOne(
      "trolls",
      { "name.0": troll.name[0] },
      troll
    );
    return NextResponse.json(troll);
  }
  //ok, now post
  await createOne("trolls", troll);
  return NextResponse.json(troll);
}
