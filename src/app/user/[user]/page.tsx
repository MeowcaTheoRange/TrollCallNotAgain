import Box from "@/components/Box/Box";
import { notFound } from "next/navigation";
import ColorManager from "@/components/ColorManager/ColorManager";
import { ServerUserToClientUser, getUserByName } from "@/lib/trollcall/user";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import Flair from "@/components/shell/Flair/Flair";
import { getTrollsByUser } from "@/lib/trollcall/troll";
import { AdaptivePossessive } from "@/types/assist/language";
import TrollCard from "@/components/shell/TrollCard/TrollCard";

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
      <Box title={user.name} primary>
        {user.url ? (
          <p>
            at{" "}
            <Link href={user.url} target="_blank">
              {user.url}
            </Link>
          </p>
        ) : (
          <></>
        )}
        <div className="paragraph">
          {user.flairs.map((flair, i) => (
            <Flair key={i} flair={flair} />
          ))}
        </div>
        <div className="content">
          <ReactMarkdown>{user.description}</ReactMarkdown>
        </div>
      </Box>
      <Box title={AdaptivePossessive(user.name, "trolls")} small>
        {userTrolls?.map((troll, i) => (
          <TrollCard key={i} troll={troll} />
        ))}
      </Box>
    </>
  );
}
