import Box from "@/components/Box/Box";
import ColorManager from "@/components/ColorManager/ColorManager";
import TrollCard from "@/components/shell/TrollCard/TrollCard";
import UserCard from "@/components/shell/UserCard/UserCard";
import { getTrollsByPage } from "@/lib/trollcall/troll";
import { ServerUserToClientUser, getUserByName } from "@/lib/trollcall/user";
import { AdaptivePossessive } from "@/types/assist/language";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateMetadata({ params }: { params: { user: string } }) {
  return { title: "User - " + params.user };
}

export default async function UserPage({
  params,
  searchParams,
}: {
  params: { user: string };
  searchParams: { trollPage: number };
}) {
  var initialUser = await getUserByName(params.user);
  if (initialUser == null) return notFound();
  var user = await ServerUserToClientUser(initialUser);

  // Troll pagination
  var pageIndex = +(searchParams.trollPage || 0);
  if (pageIndex < 0) return notFound();
  var getUserTrolls = await getTrollsByPage(initialUser, 5, pageIndex);
  if (pageIndex >= (getUserTrolls?.countPages || 1)) return notFound();
  var userTrolls = getUserTrolls?.list ?? [];
  return (
    <>
      <ColorManager mainColor={user.color} />
      <UserCard user={user} inline />
      <Box title={AdaptivePossessive(user.name, "trolls")} small>
        {userTrolls?.map((troll, i) => (
          <TrollCard key={i} troll={troll} />
        ))}
        {pageIndex > 0 ? (
          <Link href={`?trollPage=${pageIndex - 1}`}>Previous Page</Link>
        ) : (
          <></>
        )}
        {pageIndex < (getUserTrolls?.countPages || 1) - 1 ? (
          <Link href={`?trollPage=${pageIndex + 1}`}>Next Page</Link>
        ) : (
          <></>
        )}
      </Box>
      <style>{`body div.layout {max-width: 1024px;}`}</style>
    </>
  );
}
