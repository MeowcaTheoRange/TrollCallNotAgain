import Box from "@/components/Box/Box";
import Flexbox from "@/components/Flexbox/Flexbox";
import { ClassList } from "@/types/assist/extended_zodiac";
import { Pluralize } from "@/types/assist/language";
import { iswitch } from "iswitch";
import Link from "next/link";

export const metadata = {
  title: "All Classes",
};

export default function Classes() {
  return (
    <Box title={"Classes"} primary>
      {ClassList.map((theclass, i) => (
        <>
          <hr />
          <h1>
            <Link href={`/hiveswap/class/${theclass.name}`}>
              {theclass.name}
            </Link>
          </h1>
          <Flexbox direction="column" gap="8px">
            <p>
              Usually {theclass.gender}{" "}
              {iswitch(
                theclass.gender,
                ["Female", () => "♀"],
                ["Male", () => "♂"],
                ["Unisex", () => "⚥"]
              )}
            </p>
            <p>
              {Pluralize(theclass.name)} {theclass.disposition.toLowerCase()}
              ly {theclass.keyword.toLowerCase()} their aspect.
            </p>
          </Flexbox>
        </>
      ))}
    </Box>
  );
}
