import UserAuthWall from "@/components/UserAuthWall/UserAuthWall";
import {
  ServerTrollToSubmitTroll,
  getTrollByName,
} from "@/lib/trollcall/troll";
import { ProperNounCase } from "@/types/assist/language";
import { notFound } from "next/navigation";
import TrollSubmit from "../../../troll/page";

export function generateMetadata({ params }: { params: { troll: string } }) {
  return { title: "Edit Troll - " + ProperNounCase(params.troll) };
}

export default async function TrollSubmitLayout({
  params,
}: {
  params: { troll: string };
}): Promise<any> {
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
