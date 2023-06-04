import Box from "@/components/Box/Box";
import Flexbox from "@/components/Flexbox/Flexbox";
import { AspectList } from "@/types/assist/extended_zodiac";
import Link from "next/link";

export default function Aspects() {
  return (
    <Box title={"Aspects"} primary>
      {AspectList.map((aspect) => (
        <>
          <hr />
          <h1>
            <Link href={`/hiveswap/aspect/${aspect.name}`}>{aspect.name}</Link>
          </h1>
          <Flexbox gap="16px">
            <img
              className="icon"
              width={96}
              height={96}
              src={`/assets/aspect/${aspect.name}.svg`}
              alt={aspect.name}
            ></img>
            <p>{aspect.description}</p>
          </Flexbox>
        </>
      ))}
    </Box>
  );
}
