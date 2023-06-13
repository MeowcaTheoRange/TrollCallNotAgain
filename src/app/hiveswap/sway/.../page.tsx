import Box from "@/components/Box/Box";
import Flexbox from "@/components/Flexbox/Flexbox";
import { SwayList } from "@/types/assist/extended_zodiac";
import Link from "next/link";

export const metadata = {
  title: "Either Sway",
};

export default function Sways() {
  return (
    <Box title={"Sway"} primary>
      {SwayList.map((sway) => (
        <>
          <hr />
          <h1>
            <Link href={`/hiveswap/sway/${sway.name}`}>{sway.name}</Link>
          </h1>
          <Flexbox gap="16px">
            <img
              className="icon"
              width={96}
              height={96}
              src={`/assets/sway/${sway.name}.png`}
              alt={sway.name}
            ></img>
            <p>{sway.description}</p>
          </Flexbox>
        </>
      ))}
    </Box>
  );
}
