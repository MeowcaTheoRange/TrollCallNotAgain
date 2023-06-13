import { createOne, replaceOne } from "@/lib/mongodb/crud";
import { SubmitUserToServerUser, getUserByName } from "@/lib/trollcall/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ValidationError } from "yup";

export async function POST(request: Request) {
  const body = await request.json();
  const authCookies = cookies();
  const [userName, userCode] = [
    authCookies.get("TROLLCALL_NAME")?.value,
    authCookies.get("TROLLCALL_CODE")?.value,
  ];
  let user: any;
  try {
    user = await SubmitUserToServerUser(body);
  } catch (err) {
    return new Response((err as Error | ValidationError).message, {
      status: 400,
    });
  }
  // quickly, check if user with name exists!
  var existingUser = await getUserByName(user.name);
  if (existingUser && existingUser?.name == user.name) {
    if (userName === existingUser.name && userCode === existingUser.code) {
      delete user._id;
      Object.keys(user).forEach((key) => {
        if (user[key] == null) delete user[key];
      });
      var newUser = await replaceOne(
        "users",
        { name: userName, code: userCode },
        { ...existingUser, ...user } // merge them to preserve null keys
      );
      return NextResponse.json(user);
    }

    return new Response(`User with name ${user.name} already exists`, {
      status: 409,
    });
  }
  //ok, now post
  await createOne("users", user);
  return NextResponse.json(user);
}

export async function GET(request: Request) {
  const authCookies = cookies();
  const [userName, userCode] = [
    authCookies.get("TROLLCALL_NAME")?.value,
    authCookies.get("TROLLCALL_CODE")?.value,
  ];
  if (userName == null) return new Response("Name empty", { status: 403 });
  var user = await getUserByName(userName);
  if (user == null) return { notFound: true };
  if (userCode === user.code) return NextResponse.json(user);
  return { notFound: true };
}
