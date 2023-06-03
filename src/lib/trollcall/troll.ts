import { ObjectId, WithId } from "mongodb";
import { readMany, readOne } from "../mongodb/crud";
import { ServerUserToClientUser, getUserByName, getUsersByArray } from "./user";
import { ClientTroll, ServerTroll } from "@/types/troll";
import { Class, TrueSign } from "@/types/assist/extended_zodiac";
import { ServerUser } from "@/types/user";
import { ServerFlair } from "@/types/flair";
import { getFlairsByArray } from "./flair";

export async function getTrollByID(_id: string) {
  const trollObj = (await readOne("trolls", {
    _id,
  })) as WithId<ServerTroll> | null;
  if (trollObj != null) return trollObj;
  return null;
}

export async function getTrollByName(name: string, user: any) {
  if (user == null) return null;
  const trollObj = (await readOne("trolls", {
    owners: user._id,
    "name.0": name,
  })) as WithId<ServerTroll> | null;
  if (trollObj != null) return trollObj;
  return null;
}

export async function getTrollsByUser(user: any, limit?: number) {
  if (user == null) return null;
  const trollArr = readMany("trolls", {
    owners: user._id,
  }).limit(limit || 0);
  let trollList = [];
  while (await trollArr.hasNext()) {
    trollList.push(
      await ServerTrollToClientTroll((await trollArr.next()) as ServerTroll)
    );
  }
  if (trollArr != null) return trollList;
  return null;
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
    image: serverTroll.image,
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
    falseSign: serverTroll.falseSign ? TrueSign[serverTroll.falseSign] : null,
    username: serverTroll.username,
  };
  clientTroll.flairs = await getFlairsByArray(serverTroll.flairs);
  clientTroll.owners = await getUsersByArray(serverTroll.owners);

  return clientTroll;
}
