import Box from "@/components/Box/Box";
import ColorManager from "@/components/ColorManager/ColorManager";
import UserCard from "@/components/shell/UserCard/UserCard";
import { getUsersByPage } from "@/lib/trollcall/user";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
  title: "TrollCall Users",
};

export default async function Home({
  searchParams,
}: {
  searchParams: { userPage: number };
}) {
  // User pagination
  var userIndex = +(searchParams.userPage || 0);
  if (userIndex < 0) return notFound();
  var getUsers = await getUsersByPage(25, userIndex);
  if (userIndex >= (getUsers?.countPages || 1)) return notFound();
  var users = getUsers?.list ?? [];
  return (
    <>
      <ColorManager mainColor={[0xff, 0xff, 0xe0]} />
      <Box title={`Explore`} primary>
        See all users on TrollCall.
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
