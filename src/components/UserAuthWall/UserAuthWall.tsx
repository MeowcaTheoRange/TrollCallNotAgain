import { getUserByName } from "@/lib/trollcall/user";
import { cookies } from "next/headers";

export default async function UserAuthWall() {
  const cookieStore = cookies();
  var user;
  var userName = cookieStore.get("TROLLCALL_NAME")?.value;
  var userCode = cookieStore.get("TROLLCALL_CODE")?.value;
  if (userName != null) user = await getUserByName(userName);
  console.log("UserAuthWall", userName, userCode, user);
  if (user == null) return "Not Authenticated";
  if (userCode !== user.code) return "Code Incorrect";
  return user;
}
