import { Class, TrueSign } from "@/types/assist/extended_zodiac";
import { SubmitTroll, SubmitTrollSchema } from "@/types/client/troll";
import { ClientTroll, ServerTroll } from "@/types/troll";
import { ServerUser } from "@/types/user";
import { ObjectId, WithId } from "mongodb";
import { countMany, readMany, readOne } from "../mongodb/crud";
import { getFlairsByArray } from "./flair";
import { getUsersByArray } from "./user";

export async function getTrollByID(_id: ObjectId) {
  const trollObj = (await readOne("trolls", {
    _id,
  })) as WithId<ServerTroll>;
  return trollObj;
}

export async function getTrollByName(name: string, user: any) {
  if (user == null) return null;
  const trollObj = (await readOne("trolls", {
    owners: user._id,
    "name.0": name.toLowerCase(),
  })) as WithId<ServerTroll> | null;
  if (trollObj != null) return trollObj;
  return null;
}

export async function getTrollsByArray(array: ObjectId[]) {
  const trollArr = readMany("trolls", {
    _id: { $in: array },
  });
  let trollList = [];
  while (await trollArr.hasNext()) {
    trollList.push(
      await ServerTrollToClientTroll((await trollArr.next()) as ServerTroll)
    );
  }
  return trollList;
}

export async function getTrollsByPage(
  user?: any,
  limit: number = 0,
  page: number = 0
) {
  const trollArr = readMany(
    "trolls",
    user
      ? {
          owners: user._id,
        }
      : {}
  )
    .sort([["_id", -1]])
    .limit(limit)
    .skip(limit * page);
  const trollCount = await countMany(
    "trolls",
    user
      ? {
          owners: user._id,
        }
      : {}
  );
  let trollList = [];
  while (await trollArr.hasNext()) {
    trollList.push(
      await ServerTrollToClientTroll((await trollArr.next()) as ServerTroll)
    );
  }
  if (trollArr != null)
    return {
      list: trollList,
      endOfPagination: trollList.length < limit,
      count: trollCount,
      countPages: Math.ceil(trollCount / limit),
    };
  return null;
}

export async function SubmitTrollToServerTroll(
  submitTroll: SubmitTroll,
  owner: ServerUser
): Promise<ServerTroll> {
  try {
    submitTroll = await SubmitTrollSchema.validate(submitTroll);
  } catch (err) {
    throw err;
  } // yup validate
  let serverTroll: ServerTroll = {
    _id: new ObjectId(),
    age: submitTroll.age,
    class: submitTroll.class,
    description: submitTroll.description,
    facts: [...submitTroll.facts],
    // @ts-ignore
    flairs: null,
    // @ts-ignore
    owners: null,
    gender: submitTroll.gender,
    height: submitTroll.height,
    image: submitTroll.image,
    name: [...submitTroll.name],
    policies: { ...submitTroll.policies },
    preferences: {
      love: [...submitTroll.preferences.love],
      hate: [...submitTroll.preferences.hate],
    },
    pronouns: submitTroll.pronouns.map((pronoun) => [...pronoun]),
    pronunciation: [...submitTroll.pronunciation],
    quirks: Object.fromEntries(submitTroll.quirks), // don't even get me fucking started. just leave this as-is and DON'T ELABORATE.
    // ok
    species:
      submitTroll.species != null && submitTroll.species != ""
        ? "Troll-" + submitTroll.species
        : "Troll",
    textColor: submitTroll.textColor,
    trueSign: submitTroll.trueSign,
    falseSign: submitTroll.falseSign ?? null,
    username: submitTroll.username,
  };

  return serverTroll;
}

export function ServerTrollToSubmitTroll(
  serverTroll: ServerTroll
): SubmitTroll {
  let submitTroll: SubmitTroll = {
    age: serverTroll.age,
    class: serverTroll.class,
    description: serverTroll.description,
    facts: [...serverTroll.facts],
    // @ts-ignore
    owners: [...serverTroll.owners],
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
    quirks: Object.entries(serverTroll.quirks), // don't even get me fucking started. just leave this as-is and DON'T ELABORATE.
    // ok
    species: serverTroll.species?.replace("Troll-", ""),
    textColor: serverTroll.textColor,
    trueSign: serverTroll.trueSign,
    falseSign: serverTroll.falseSign ?? null,
    username: serverTroll.username,
  };

  return submitTroll;
}

export async function ServerTrollToClientTroll(
  serverTroll: ServerTroll
): Promise<ClientTroll> {
  let clientTroll: ClientTroll = {
    age: serverTroll.age,
    class: Class[serverTroll.class],
    description: serverTroll.description,
    facts: [...serverTroll.facts],
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
    // ok
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
