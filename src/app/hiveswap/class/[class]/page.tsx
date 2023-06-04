import Box from "@/components/Box/Box";
import { Class } from "@/types/assist/extended_zodiac";
import { notFound } from "next/navigation";
import Flexbox from "@/components/Flexbox/Flexbox";
import { iswitch } from "iswitch";
import Link from "next/link";
import { Pluralize } from "@/types/assist/language";

export default function ClassPage({ params }: { params: { class: string } }) {
  var gottenClass = Class[params.class];
  if (gottenClass == null) return notFound();
  console.log(gottenClass);
  return (
    <>
      <Box title={gottenClass.name} primary>
        <Flexbox gap="8px" padding="8px" justify="center">
          <span>
            Paired with{" "}
            <Link href={`/hiveswap/class/${gottenClass.pair}`}>
              {gottenClass.pair}
            </Link>
          </span>
          <span>•</span>
          <span>
            Inverse of{" "}
            <Link href={`/hiveswap/class/${gottenClass.inverse}`}>
              {gottenClass.inverse}
            </Link>
          </span>
        </Flexbox>
        <p>
          Usually {gottenClass.gender}{" "}
          {iswitch(
            gottenClass.gender,
            ["Female", () => "♀"],
            ["Male", () => "♂"],
            ["Unisex", () => "⚥"]
          )}
        </p>
        <p>
          {Pluralize(gottenClass.name)} {gottenClass.disposition.toLowerCase()}
          ly {gottenClass.keyword.toLowerCase()} their aspect.
        </p>
      </Box>
    </>
  );
}