import Box from "@/components/Box/Box";
import ColorManager from "@/components/ColorManager/ColorManager";
import TrollCard from "@/components/shell/TrollCard/TrollCard";
import { getTrollsByPage } from "@/lib/trollcall/troll";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
  title: "TrollCall Trolls",
};

export default async function Home({
  searchParams,
}: {
  searchParams: { trollPage: number };
}) {
  // Troll pagination
  var trollIndex = +(searchParams.trollPage || 0);
  if (trollIndex < 0) return notFound();
  var getTrolls = await getTrollsByPage(null, 25, trollIndex);
  if (trollIndex >= (getTrolls?.countPages || 1)) return notFound();
  var trolls = getTrolls?.list ?? [];
  return (
    <>
      <ColorManager mainColor={[0xff, 0xff, 0xe0]} />
      <Box title={`Explore`} primary>
        See all users on TrollCall.
      </Box>
      <Box title="TROLLS ON TROLLCALL" small>
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
    </>
  );
}
