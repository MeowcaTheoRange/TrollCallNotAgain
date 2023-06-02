import { ObjectId } from "mongodb";
import { readMany, readOne } from "../mongodb/crud";
import { ClientUser, ServerUser } from "@/types/user";
import { ServerTrollToClientTroll } from "./troll";
import { ServerTroll } from "@/types/troll";

export async function getUserByID(_id: string) {
  return await readOne("users", { _id });
}

export async function getUserByName(name: string) {
  return await readOne("users", { name });
}

export async function ServerUserToClientUser(
  serverUser: ServerUser
): Promise<ClientUser> {
  let clientUser: ClientUser = {
    name: serverUser.name,
    description: serverUser.description,
    url: serverUser.url,
    color: serverUser.color,
    // @ts-ignore
    flairs: null,
  };

  // // get flairs
  // let flairCursor = readMany("flairs", { _id: { $in: serverUser.flairs } });
  // let flairList = [];
  // while (await flairCursor.hasNext()) {
  //   flairList.push(await ServerFlairToClientFlair(await flairCursor.next() as ServerFlair));
  // }
  // clientUser.flairs = flairList;

  return clientUser;
}
