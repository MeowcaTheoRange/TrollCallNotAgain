import { ObjectId, WithId } from "mongodb";
import { readMany, readOne } from "../mongodb/crud";
import { ClientUser, ServerUser } from "@/types/user";
import { getFlairsByArray } from "./flair";
import { TrueSign } from "@/types/assist/extended_zodiac";

export async function getUserByID(_id: string) {
  const userObj = (await readOne("users", {
    _id,
  })) as WithId<ServerUser> | null;
  if (userObj != null) return userObj;
  return null;
}

export async function getUserByName(name: string) {
  const userObj = (await readOne("users", {
    name,
  })) as WithId<ServerUser> | null;
  if (userObj != null) return userObj;
  return null;
}

export async function getUsersByArray(array: ObjectId[]) {
  const userArr = readMany("users", {
    _id: { $in: array },
  });
  let userList = [];
  while (await userArr.hasNext()) {
    userList.push(
      await ServerUserToClientUser((await userArr.next()) as ServerUser)
    );
  }
  return userList;
}

export async function ServerUserToClientUser(
  serverUser: ServerUser
): Promise<ClientUser> {
  let clientUser: ClientUser = {
    name: serverUser.name,
    description: serverUser.description,
    url: serverUser.url,
    color: serverUser.color,
    trueSign: TrueSign[serverUser.trueSign],
    // @ts-ignore
    flairs: null,
  };
  clientUser.flairs = await getFlairsByArray(serverUser.flairs);

  return clientUser;
}