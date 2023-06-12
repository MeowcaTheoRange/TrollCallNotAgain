import UserAuthWall from "@/components/UserAuthWall/UserAuthWall";
import {
  ServerTrollToSubmitTroll,
  getTrollByName,
} from "@/lib/trollcall/troll";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import TrollSubmit from "../page";

// @ts-ignore dont care about recursion
export default async function TrollSubmitLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { troll: string };
}): Promise<ReactNode> {
  const isLoggedIn = await UserAuthWall();
  if (typeof isLoggedIn === "object") {
    var thisTroll = await getTrollByName(params.troll, isLoggedIn);
    if (thisTroll != null)
      return (
        <TrollSubmit params={{ troll: ServerTrollToSubmitTroll(thisTroll) }} />
      );
    return notFound();
  } else return isLoggedIn;
}
