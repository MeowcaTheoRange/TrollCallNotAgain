import Box from "@/components/Box/Box";
import { SwayList } from "@/types/assist/extended_zodiac";
import Image from "next/image";
import Link from "next/link";

export default function Sways() {
  return (
    <Box title={"Sway"} primary>
      {SwayList.map((sway) => (
        <>
          <hr />
          <h1>
            <Link href={`/hiveswap/sway/${sway.name}`}>{sway.name}</Link>
          </h1>
          <div className="paragraph">
            <img
              className="icon"
              width={96}
              height={96}
              src={`/assets/sway/${sway.name}.png`}
              alt={sway.name}
            ></img>
            <p>{sway.description}</p>
          </div>
        </>
      ))}
    </Box>
  );
}
