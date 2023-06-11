import UserAuthWall from "@/components/UserAuthWall/UserAuthWall";
import { ServerUsertoSubmitUser } from "@/lib/trollcall/user";
import { ReactNode } from "react";
import Form from "./page";

// @ts-ignore dont care about recursion
export default async function UserSubmitLayout({
  children,
}: {
  children: ReactNode;
}): Promise<ReactNode> {
  const isLoggedIn = await UserAuthWall();
  if (isLoggedIn == "Not Authenticated") return children;
  else if (typeof isLoggedIn === "object")
    return <Form params={{ user: ServerUsertoSubmitUser(isLoggedIn) }} />;
  else return isLoggedIn;
}
