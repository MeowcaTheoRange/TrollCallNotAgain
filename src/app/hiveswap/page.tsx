import Box from "@/components/Box/Box";
import { brand } from "@/types/assist/branding";
import ColorManager from "@/components/ColorManager/ColorManager";
import Link from "next/link";
import Image from "next/image";

export default function Hiveswap() {
  return (
    <>
      <ColorManager mainColor={[0x80, 0x00, 0xff]} />
      <Box title={`Hiveswap`} primary>
        <p>
          Welcome to the Hiveswap portion of TrollCall. Here we pay homage to
          the original{" "}
          <Link href="http://hs.hiveswap.com/ezodiac/">Extended Zodiac</Link>{" "}
          website by providing its services, but this time, in a kind of cool
          modern statically generated way.
        </p>
        <p>
          If TrollCall doesn't have the data on the True Signs that you thought
          we would have, that's OK! Just head over to the original website (or
          many <Link href="https://homestuck.net/">fan resources</Link>) to see
          if they have it.
        </p>
        <p>
          We also have an API for this stuff. A clear one-up on the fact that
          most Homestuck resources don't.
        </p>
        <hr />
        <div className="gallery">
          <Link href="/hiveswap/aspect/...">
            <p>
              <h1>Aspects</h1>
              <img
                src={"/assets/hiveswap/aspects.png"}
                width="256"
                height="256"
                alt="Aspects"
              ></img>
            </p>
          </Link>
          <Link href="/hiveswap/sway/...">
            <p>
              <h1>Sway</h1>
              <img
                src={"/assets/hiveswap/sway.png"}
                width="256"
                height="256"
                alt="Sway"
              ></img>
            </p>
          </Link>
          <Link href="/hiveswap/color/...">
            <p>
              <h1>Colors</h1>
              <img
                src={"/assets/hiveswap/signs.png"}
                width="256"
                height="256"
                alt="Colors"
              ></img>
            </p>
          </Link>
        </div>
      </Box>
    </>
  );
}
