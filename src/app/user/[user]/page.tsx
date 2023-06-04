import Box from "@/components/Box/Box";
import ColorManager from "@/components/ColorManager/ColorManager";
import TrollCard from "@/components/shell/TrollCard/TrollCard";
import UserCard from "@/components/shell/UserCard/UserCard";
import { getTrollsByUser } from "@/lib/trollcall/troll";
import { ServerUserToClientUser, getUserByName } from "@/lib/trollcall/user";
import { AdaptivePossessive } from "@/types/assist/language";
import { notFound } from "next/navigation";

export default async function UserPage({
  params,
}: {
  params: { user: string };
}) {
  var initialUser = await getUserByName(params.user);
  if (initialUser == null) return notFound();
  var user = await ServerUserToClientUser(initialUser);
  var userTrolls = await getTrollsByUser(initialUser, 10);
  console.log(userTrolls);
  return (
    <>
      <ColorManager mainColor={user.color} />
      <UserCard user={user} inline />
      <Box title={AdaptivePossessive(user.name, "trolls")} small>
        {userTrolls?.map((troll, i) => (
          <TrollCard key={i} troll={troll} />
        ))}
      </Box>
    </>
  );
}
