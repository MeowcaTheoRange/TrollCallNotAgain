import { WithId } from "mongodb";
import { readMany, readOne } from "../mongodb/crud";
import { ServerUserToClientUser, getUser } from "./user";
import { ClientTroll, ServerTroll } from "@/types/troll";
import { Class, TrueSign } from "@/types/assist/extended_zodiac";
import { ServerUser } from "@/types/user";
import { ServerFlair } from "@/types/flair";

export async function getTroll(user: string, troll: string) {
  const userObj = await getUser(user);
  const trollObj = (await readOne("trolls", {
    "name.0": troll,
    owners: userObj?._id,
  })) as WithId<ServerTroll> | null;
  if (trollObj != null) return trollObj;
}

export async function getTrollByID(_id: string) {
  const trollObj = (await readOne("trolls", {
    _id,
  })) as WithId<ServerTroll> | null;
  if (trollObj != null) return trollObj;
}

export async function ServerTrollToClientTroll(
  serverTroll: ServerTroll
): Promise<ClientTroll> {
  let clientTroll: ClientTroll = {
    age: serverTroll.age,
    class: Class[serverTroll.class],
    description: serverTroll.description,
    facts: [...serverTroll.facts],
    ...(serverTroll.falseSign && {
      falseSign: TrueSign[serverTroll.falseSign],
    }),
    // @ts-ignore
    flairs: null,
    // @ts-ignore
    owners: null,
    gender: serverTroll.gender,
    height: serverTroll.height,
    name: [...serverTroll.name],
    policies: { ...serverTroll.policies },
    preferences: {
      love: [...serverTroll.preferences.love],
      hate: [...serverTroll.preferences.hate],
    },
    pronouns: serverTroll.pronouns.map((pronoun) => [...pronoun]),
    pronunciation: [...serverTroll.pronunciation],
    quirks: serverTroll.quirks, // don't even get me fucking started. just leave this as-is and DON'T ELABORATE.
    species: serverTroll.species,
    textColor: serverTroll.textColor, // I don't even know what this type is or what it could be. For all I know, it's a `[number, number, number] | string | number`.
    // This is not good.
    trueSign: TrueSign[serverTroll.trueSign],
    username: serverTroll.username,
  };

  // // get flairs
  // let flairCursor = readMany("flairs", { _id: { $in: serverTroll.flairs } });
  // let flairList = [];
  // while (await flairCursor.hasNext()) {
  //   flairList.push(await ServerFlairToClientFlair(await flairCursor.next() as ServerFlair));
  // }
  // clientTroll.flairs = flairList;

  // get owners
  let ownerCursor = readMany("users", { _id: { $in: serverTroll.owners } });
  let ownerList = [];
  while (await ownerCursor.hasNext()) {
    ownerList.push(
      await ServerUserToClientUser((await ownerCursor.next()) as ServerUser)
    );
  }
  clientTroll.owners = ownerList;

  return clientTroll;
}
