import { createOne } from "@/lib/mongodb/crud";
import { SubmitUserToServerUser, getUserByName } from "@/lib/trollcall/user";
import { NextResponse } from "next/server";
import { ValidationError } from "yup";

export async function POST(request: Request) {
  const body = await request.json();
  let user;
  try {
    user = await SubmitUserToServerUser(body);
  } catch (err) {
    return new Response((err as Error | ValidationError).message, {
      status: 400,
    });
  }
  // quickly, check if user with name exists!
  var existingUser = await getUserByName(user.name);
  if (existingUser?.name == user.name)
    return new Response(`User with name ${user.name} already exists`, {
      status: 409,
    });
  //ok, now post
  await createOne("users", user);
  return NextResponse.json(user);
}
