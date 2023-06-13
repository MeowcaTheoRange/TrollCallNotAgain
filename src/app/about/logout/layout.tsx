import UserAuthWall from "@/components/UserAuthWall/UserAuthWall";
import { ReactNode } from "react";

export const metadata = {
  title: "Logging Out",
};

// @ts-ignore dont care about recursion
export default async function LogoutLayout({
  children,
}: {
  children: ReactNode;
}): Promise<ReactNode> {
  const isLoggedIn = await UserAuthWall();
  if (typeof isLoggedIn === "object" || isLoggedIn === "Code Incorrect")
    return children;
  else return isLoggedIn;
}
