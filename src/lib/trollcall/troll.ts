import { WithId } from "mongodb";
import { readOne } from "../mongodb/crud";
import { ServerUserToClientUser, getUser } from "./user";
import { ClientTroll, ServerTroll } from "@/types/troll";
import { Class, TrueSign } from "@/types/assist/extended_zodiac";
import { ClientUser, ServerUser } from "@/types/user";

export async function getTroll(user: string, troll: string) {
  const userObj = await getUser(user);
  const trollObj = (await readOne("trolls", {
    "name.0": troll,
    owners: userObj?._id,
  })) as WithId<ServerTroll> | null;
  if (trollObj != null) return;
}

export async function getTrollByID(_id: string) {
  const trollObj = (await readOne("trolls", {
    _id,
  })) as WithId<ServerTroll> | null;
  if (trollObj != null) return;
}

export async function ServerTrollToClientTroll(
  serverTroll: ServerTroll
): Promise<ClientTroll> {
  let clientTroll: ClientTroll = {
    age: serverTroll.age,
    class: Class[serverTroll.class],
    description: serverTroll.description,
    facts: [...serverTroll.facts],
    // ...(serverTroll.falseSign ? { // i'm sure there's a better way to do this. lemme check MSPFA/MSPFA
    //   falseSign: TrueSign[serverTroll.falseSign],
    // } : {}),
    ...(serverTroll.falseSign && {
      // knew it
      falseSign: TrueSign[serverTroll.falseSign],
    }),
    // @ts-ignore for now, make @/lib/trollcall/flair.ts
    flairs: await Promise.all(serverTroll.flairs.map(async (flairId) => {})),
    gender: serverTroll.gender,
    height: serverTroll.height,
    name: [...serverTroll.name],
    owners: await Promise.all(
      serverTroll.owners.map(
        async (ownerId) =>
          await ServerUserToClientUser(
            (await readOne("users", { _id: ownerId })) as ServerUser
          )
      )
    ),
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
  return clientTroll;
}

/*
  I almost got kicked out of McDonalds because I was being racist (see https://www.reddit.com/r/Tautology/comments/fxthfl/got_called_racist_in_a_mcdonalds_for_being_racist/, I'm joking). 
  If I were to write an entire House of Leaves "footnote story" in my code, do you think people would lynch me for seeing that the source exceeds their expectations for what TS source code should be?
  You'd see "1GB" and think "wow, this guy worked hard",
  and then it's just like... 800 pages of shit in one TS file. I'd also go "what the fuck is this Johnny Truant type shit" upon seeing that.
  
  Have you ever been to Ohio? No, I don't mean *Backrooms Siren Head Huggy Wuggy Goofy-ahh* Ohio, I mean Ohio-Ohio. 
  Scott The Woz Ohio. 
  Unscented candle (https://www.instagram.com/p/ByVVYxzgVkz/ sorry for the trackers) Ohio.
  Columbus, Ohio is home to one of the greatest gaming media conventions, possibly ever?
  No, I'm exaggerating. Of course, there is better (https://www.gencon.com/), but I shouldn't be talking about it around this time (May 29, 2023).
  I'll leave you to guess.












































































































































































































































































































































  https://www.originsgamefair.com/
*/
