import UserAuthWall from "@/components/UserAuthWall/UserAuthWall";
import { ReactNode } from "react";

export const metadata = {
  title: "Submit Troll",
};

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
