import { ClientFlair, ServerFlair } from "@/types/flair";
import { ObjectId, WithId } from "mongodb";
import { readMany, readOne } from "../mongodb/crud";

export async function getFlairByID(_id: ObjectId) {
  const flairObj = (await readOne("flairs", {
    _id,
  })) as WithId<ServerFlair>;
  return flairObj;
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
