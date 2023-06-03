import Box from "@/components/Box/Box";
import { TrueSign } from "@/types/assist/extended_zodiac";
import Image from "next/image";
import { notFound } from "next/navigation";
import ColorManager from "@/components/ColorManager/ColorManager";
import Link from "next/link";

export default function TrueSignPage({ params }: { params: { sign: string } }) {
  var gottenSign = TrueSign[params.sign];
  if (gottenSign == null) return notFound();
  return (
    <>
      <ColorManager mainColor={gottenSign.color.color} />
      <Box title={gottenSign.name} primary>
        <div className="paragraph">
          <img
            width={96}
            height={96}
            src={`/assets/signs/${gottenSign.color.name}/${gottenSign.name}.svg`}
            alt={gottenSign.name}
          ></img>
          <p>
            If your true sign is <b>{gottenSign.name}</b>, then you possess the
            unique combination of qualities held by all{" "}
            <b>
              <Link href={`/hiveswap/color/${gottenSign.color.name}`}>
                {gottenSign.color.name} Signs
              </Link>
            </b>
            ,{" "}
            <b>
              <Link href={`/hiveswap/sway/${gottenSign.sway.name}`}>
                {gottenSign.sway.name} Dreamers
              </Link>
            </b>
            , and{" "}
            <b>
              <Link href={`/hiveswap/aspect/${gottenSign.aspect.name}`}>
                {gottenSign.aspect.name}-bound
              </Link>
            </b>
            .
          </p>
        </div>
        <hr />
        <h1>Sign Class: {gottenSign.color.name}</h1>
        <p>{gottenSign.color.description}</p>
        <Link href={`/hiveswap/color/...`}>See All Sign Classes</Link>
        <hr />
        <h1>Lunar Sway: {gottenSign.sway.name}</h1>
        <p>{gottenSign.sway.description}</p>
        <Link href={`/hiveswap/sway/...`}>See Either Sway</Link>
        <hr />
        <h1>Aspect: {gottenSign.aspect.name}</h1>
        <p>{gottenSign.aspect.description}</p>
        <Link href={`/hiveswap/aspect/...`}>See All Aspects</Link>
      </Box>
    </>
  );
}
