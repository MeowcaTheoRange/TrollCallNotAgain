import UserAuthWall from "@/components/UserAuthWall/UserAuthWall";
import { ReactNode } from "react";

// @ts-ignore dont care about recursion
export default async function TrollSubmitLayout({
  children,
}: {
  children: ReactNode;
}): Promise<ReactNode> {
  const isLoggedIn = await UserAuthWall();
  if (typeof isLoggedIn === "object") return children;
  else return isLoggedIn;
}
