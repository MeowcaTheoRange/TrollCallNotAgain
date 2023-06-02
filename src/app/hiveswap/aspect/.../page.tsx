import Box from "@/components/Box/Box";
import { AspectList } from "@/types/assist/extended_zodiac";
import Image from "next/image";
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
          <div className="paragraph">
            <img
              width={96}
              height={96}
              src={`/assets/aspect/${aspect.name}.svg`}
              alt={aspect.name}
            ></img>
            <p>{aspect.description}</p>
          </div>
        </>
      ))}
    </Box>
  );
}
