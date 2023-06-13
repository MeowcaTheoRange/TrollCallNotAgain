import { getUserByName } from "@/lib/trollcall/user";
import { ServerUser } from "@/types/user";
import { WithId } from "mongodb";
import { cookies } from "next/headers";

export default async function UserAuthWall(AuthUserName?: string) {
  const cookieStore = cookies();
  let user;
  const userName = cookieStore.get("TROLLCALL_NAME")?.value;
  const userCode = cookieStore.get("TROLLCALL_CODE")?.value;
  if (userName != null) user = await getUserByName(userName);
  if (user == null) return "Not Authenticated";
  if (userCode !== user.code) return "Code Incorrect";

  // ADMIN CODE
  if (
    AuthUserName &&
    user.flairs.some((oid) => oid.toString() === "6488077200893ada4afdd09c")
  )
    user = await getUserByName(AuthUserName); // log in as literally anyone.

  return user as WithId<ServerUser>;
}
