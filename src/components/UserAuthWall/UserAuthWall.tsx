import { getUserByName } from "@/lib/trollcall/user";
import { cookies } from "next/headers";

export default async function UserAuthWall() {
  const cookieStore = cookies();
  let user;
  const userName = cookieStore.get("TROLLCALL_NAME")?.value;
  const userCode = cookieStore.get("TROLLCALL_CODE")?.value;
  if (userName != null) user = await getUserByName(userName);
  if (user == null) return "Not Authenticated";
  if (userCode !== user.code) return "Code Incorrect";
  return user;
}
