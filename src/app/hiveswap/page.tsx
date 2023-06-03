import Box from "@/components/Box/Box";
import Link from "next/link";

export default function Hiveswap() {
  return (
    <>
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
            <h1>Aspects</h1>
            <img
              src={"/assets/hiveswap/aspects.png"}
              width="256"
              height="256"
              alt="Aspects"
            ></img>
          </Link>
          <Link href="/hiveswap/sway/...">
            <h1>Sway</h1>
            <img
              src={"/assets/hiveswap/sway.png"}
              width="256"
              height="256"
              alt="Sway"
            ></img>
          </Link>
          <Link href="/hiveswap/color/...">
            <h1>Colors</h1>
            <img
              src={"/assets/hiveswap/signs.png"}
              width="256"
              height="256"
              alt="Colors"
            ></img>
          </Link>
        </div>
      </Box>
    </>
  );
}
