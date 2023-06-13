import Box from "@/components/Box/Box";
import Flexbox from "@/components/Flexbox/Flexbox";
import { SignColorList } from "@/types/assist/extended_zodiac";
import Link from "next/link";

export const metadata = {
  title: "All Colors",
};

export default function Colors() {
  return (
    <Box title={"Colors"} primary>
      {SignColorList.map((color) => (
        <>
          <hr />
          <h1>
            <Link href={`/hiveswap/color/${color.name}`}>{color.name}</Link>
          </h1>
          <Flexbox gap="16px">
            <img
              className="icon"
              width={96}
              height={96}
              src={`/assets/signs/${color.name}/${color.sign}.svg`}
              alt={color.name}
            ></img>
            <p>{color.description}</p>
          </Flexbox>
        </>
      ))}
    </Box>
  );
}
