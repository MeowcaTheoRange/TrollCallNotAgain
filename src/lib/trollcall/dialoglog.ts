import { ClientDialog, ServerDialog } from "@/types/dialoglog";
import { WithId } from "mongodb";
import { readMany, readOne } from "../mongodb/crud";
import { ServerTrollToClientTroll, getTrollByID } from "./troll";
import { getUsersByArray } from "./user";

export async function getDialogByID(_id: string) {
  const dialoglogObj = (await readOne("dialoglogs", {
    _id,
  })) as WithId<ServerDialog> | null;
  if (dialoglogObj != null) return dialoglogObj;
  return null;
}

export async function getDialogByName(name: string, user: any) {
  if (user == null) return null;
  const dialoglogObj = (await readOne("dialoglogs", {
    owners: user._id,
    "name.0": name,
  })) as WithId<ServerDialog> | null;
  if (dialoglogObj != null) return dialoglogObj;
  return null;
}

export async function getDialogsByUser(user: any, limit?: number) {
  if (user == null) return null;
  const dialoglogArr = readMany("dialoglogs", {
    owners: user._id,
  }).limit(limit || 0);
  let dialoglogList = [];
  while (await dialoglogArr.hasNext()) {
    dialoglogList.push(
      await ServerDialogToClientDialog(
        (await dialoglogArr.next()) as ServerDialog
      )
    );
  }
  if (dialoglogArr != null) return dialoglogList;
  return null;
}

export async function ServerDialogToClientDialog(
  serverDialog: ServerDialog
): Promise<ClientDialog> {
  let clientDialog: ClientDialog = {
    // @ts-ignore
    owners: null,
    name: serverDialog.name,
    description: serverDialog.description,
    characters: await Promise.all(
      serverDialog.characters.map(async (serverCharacter) => ({
        troll: await ServerTrollToClientTroll(
          await getTrollByID(serverCharacter.troll)
        ),
        time: serverCharacter.time,
      }))
    ),
  };
  clientDialog.owners = await getUsersByArray(serverDialog.owners);

  return clientDialog;
}
