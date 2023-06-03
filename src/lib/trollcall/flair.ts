import { ObjectId, WithId } from "mongodb";
import { readMany, readOne } from "../mongodb/crud";
import { ServerUserToClientUser } from "./user";
import { ClientTroll, ServerTroll } from "@/types/troll";
import { Class, TrueSign } from "@/types/assist/extended_zodiac";
import { ServerUser } from "@/types/user";
import { ClientFlair, ServerFlair } from "@/types/flair";

export async function getFlairByID(_id: string) {
  const flairObj = (await readOne("flairs", {
    _id,
  })) as WithId<ServerFlair> | null;
  if (flairObj != null) return flairObj;
  return null;
}

export async function getFlairsByArray(array: ObjectId[]) {
  const flairArr = readMany("flairs", {
    _id: { $in: array },
  });
  let flairList = [];
  while (await flairArr.hasNext()) {
    flairList.push(
      await ServerFlairToClientFlair((await flairArr.next()) as ServerFlair)
    );
  }
  return flairList;
}

export function ServerFlairToClientFlair(
  serverFlair: ServerFlair
): ClientFlair {
  // i know it's redundant but it's "required"

  let clientFlair: ClientFlair = {
    alt: serverFlair.alt,
    link: serverFlair.link,
    name: serverFlair.name,
    color: [...serverFlair.color],
  };

  return clientFlair;
}
