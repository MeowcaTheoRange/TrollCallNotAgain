import UserAuthWall from "@/components/UserAuthWall/UserAuthWall";
import { ReactNode } from "react";

// @ts-ignore dont care about recursion
export default async function LogoutLayout({
  children,
}: {
  children: ReactNode;
}): Promise<ReactNode> {
  const isLoggedIn = await UserAuthWall();
  if (isLoggedIn === "Not Authenticated") return children;
  if (typeof isLoggedIn === "object") return "Already Logged In";
  else return isLoggedIn;
}
