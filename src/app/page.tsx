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
  searchParams: { trollPage: number };
}) {
  // User pagination
  var pageIndex = +(searchParams.trollPage || 0);
  if (pageIndex < 0) return notFound();
  var getUsers = await getUsersByPage(5, pageIndex);
  if (pageIndex >= (getUsers?.countPages || 1)) return notFound();
  var users = getUsers?.list ?? [];

  // Troll pagination
  var pageIndex = +(searchParams.trollPage || 0);
  if (pageIndex < 0) return notFound();
  var getTrolls = await getTrollsByPage(null, 5, pageIndex);
  if (pageIndex >= (getTrolls?.countPages || 1)) return notFound();
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
        {pageIndex > 0 ? (
          <Link href={`?trollPage=${pageIndex - 1}`}>Previous Page</Link>
        ) : (
          <></>
        )}
        {pageIndex < (getTrolls?.countPages || 1) - 1 ? (
          <Link href={`?trollPage=${pageIndex + 1}`}>Next Page</Link>
        ) : (
          <></>
        )}
      </Box>
      <Box title="USERS ON TROLLCALL" small>
        {users?.map((user, i) => (
          <UserCard key={i} user={user} />
        ))}
        {pageIndex > 0 ? (
          <Link href={`?trollPage=${pageIndex - 1}`}>Previous Page</Link>
        ) : (
          <></>
        )}
        {pageIndex < (getUsers?.countPages || 1) - 1 ? (
          <Link href={`?trollPage=${pageIndex + 1}`}>Next Page</Link>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}
