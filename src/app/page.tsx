import Box from "@/components/Box/Box";
import ColorManager from "@/components/ColorManager/ColorManager";
import TrollCard from "@/components/shell/TrollCard/TrollCard";
import UserCard from "@/components/shell/UserCard/UserCard";
import { getTrollsByPage } from "@/lib/trollcall/troll";
import { getUsersByPage } from "@/lib/trollcall/user";
import { brand } from "@/types/assist/branding";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { trollPage: number; userPage: number };
}) {
  // User pagination
  var userIndex = +(searchParams.userPage || 0);
  if (userIndex < 0) return notFound();
  var getUsers = await getUsersByPage(5, userIndex);
  if (userIndex >= (getUsers?.countPages || 1)) return notFound();
  var users = getUsers?.list ?? [];

  // Troll pagination
  var trollIndex = +(searchParams.trollPage || 0);
  if (trollIndex < 0) return notFound();
  var getTrolls = await getTrollsByPage(null, 5, trollIndex);
  if (trollIndex >= (getTrolls?.countPages || 1)) return notFound();
  var trolls = getTrolls?.list ?? [];
  return (
    <>
      <ColorManager mainColor={[0xff, 0xff, 0xe0]} />
      <Box title={`Hello!`} primary>
        Welcome to {brand.name}!
      </Box>
      <Box title="RECENT TROLLS" small>
        {trolls?.map((troll, i) => (
          <TrollCard key={i} troll={troll} />
        ))}
        {trollIndex > 0 ? (
          <Link href={`?trollPage=${trollIndex - 1}`}>Previous Page</Link>
        ) : (
          <></>
        )}
        {trollIndex < (getTrolls?.countPages || 1) - 1 ? (
          <Link href={`?trollPage=${trollIndex + 1}`}>Next Page</Link>
        ) : (
          <></>
        )}
      </Box>
      <Box title="USERS ON TROLLCALL" small>
        {users?.map((user, i) => (
          <UserCard key={i} user={user} />
        ))}
        {userIndex > 0 ? (
          <Link href={`?userPage=${userIndex - 1}`}>Previous Page</Link>
        ) : (
          <></>
        )}
        {userIndex < (getUsers?.countPages || 1) - 1 ? (
          <Link href={`?userPage=${userIndex + 1}`}>Next Page</Link>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}
