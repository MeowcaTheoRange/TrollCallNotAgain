import { TrueSign } from "@/types/assist/extended_zodiac";
import { SubmitUser, SubmitUserSchema } from "@/types/client/user";
import { ClientUser, ServerUser } from "@/types/user";
import { ObjectId, WithId } from "mongodb";
import { nanoid } from "nanoid";
import { countMany, readMany, readOne } from "../mongodb/crud";
import { getFlairsByArray } from "./flair";

export async function getUserByID(_id: ObjectId) {
  // if this ID is null then there is something incredibly wrong with the server
  const userObj = (await readOne("users", {
    _id,
  })) as WithId<ServerUser>;
  return userObj;
}

export async function getUserByName(name: string) {
  const userObj = (await readOne("users", {
    name: name.toLowerCase(),
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

export async function getUsersByPage(limit: number = 0, page: number = 0) {
  const userArr = readMany("users", {})
    .sort({ updatedDate: -1, _id: -1 })
    .limit(limit)
    .skip(limit * page);
  const userCount = await countMany("users", {});
  let userList = [];
  while (await userArr.hasNext()) {
    userList.push(
      await ServerUserToClientUser((await userArr.next()) as ServerUser)
    );
  }
  if (userArr != null)
    return {
      list: userList,
      endOfPagination: userList.length < limit,
      count: userCount,
      countPages: Math.ceil(userCount / limit),
    };
  return null;
}

export async function SubmitUserToServerUser(
  submitUser: SubmitUser
): Promise<ServerUser> {
  try {
    submitUser = await SubmitUserSchema.validate(submitUser);
  } catch (err) {
    throw err;
  } // yup validate
  let serverUser: ServerUser = {
    _id: new ObjectId(),
    name: submitUser.name,
    description: submitUser.description,
    url: submitUser.url,
    pfp: submitUser.pfp,
    color: submitUser.color,
    trueSign: submitUser.trueSign,
    code: submitUser.code || nanoid(16),
    // @ts-ignore
    flairs: null,
  };

  return serverUser;
}

export function ServerUsertoSubmitUser(serverUser: ServerUser): SubmitUser {
  let submitUser: SubmitUser = {
    name: serverUser.name,
    description: serverUser.description,
    url: serverUser.url,
    pfp: serverUser.pfp,
    color: serverUser.color,
    trueSign: serverUser.trueSign,
    code: serverUser.code,
  };

  return submitUser;
}

export async function ServerUserToClientUser(
  serverUser: ServerUser
): Promise<ClientUser> {
  let clientUser: ClientUser = {
    name: serverUser.name,
    description: serverUser.description,
    url: serverUser.url,
    pfp: serverUser.pfp,
    color: serverUser.color,
    trueSign: TrueSign[serverUser.trueSign],
    // @ts-ignore
    flairs: null,
  };
  clientUser.flairs = await getFlairsByArray(serverUser.flairs);

  return clientUser;
}
