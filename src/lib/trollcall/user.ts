import { ObjectId } from "mongodb";
import { readOne } from "../mongodb/crud";
import { ClientUser, ServerUser } from "@/types/user";

export async function getUser(name: string) {
  return await readOne("users", { name });
}

export async function getUserByID(_id: ObjectId) {
  return await readOne("users", { _id });
}

export async function ServerUserToClientUser(
  serverUser: ServerUser
): Promise<ClientUser> {
  let clientUser: ClientUser = {
    name: serverUser.name,
    description: serverUser.description,
    url: serverUser.url,
    color: serverUser.color,
    // @ts-ignore for now, make @/lib/trollcall/flair.ts
    flairs: await Promise.all(serverUser.flairs.map(async (flairId) => {})),
  };
  return clientUser;
}
