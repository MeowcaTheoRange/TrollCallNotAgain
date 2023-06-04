"use client";

import { Color3 } from "@/types/assist/color";
import { TrueSignType } from "@/types/assist/extended_zodiac";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Flexbox from "../Flexbox/Flexbox";
import "./SignBadge.css";

export default function SignBadge({ trueSign }: { trueSign: TrueSignType }) {
  const router = useRouter();
  const color = Color3.fromRGB(...trueSign.color.color);
  return (
    <button
      className="SignBadge"
      style={
        {
          "--pri-box": `#${color.darken(60).toHex()}`,
          "--pri-text": `#${color.lighten(60).toHex()}`,
        } as React.CSSProperties
      }
      onClick={(e) => {
        router.push(`/hiveswap/truesign/${trueSign.name}`);
      }}
    >
      <img
        className="icon"
        src={`/assets/signs/${trueSign.color.name}/${trueSign.name}.svg`}
        height="64"
        width="64"
      ></img>
      <Flexbox direction="column" gap="8px">
        <h2>{trueSign.name}</h2>
        <p>
          <Link
            href={`/hiveswap/color/${trueSign.color.name}`}
            onClick={(e) => e.stopPropagation()}
          >
            {trueSign.color.name}
          </Link>{" "}
          +{" "}
          <Link
            href={`/hiveswap/sway/${trueSign.sway.name}`}
            onClick={(e) => e.stopPropagation()}
          >
            {trueSign.sway.name}
          </Link>{" "}
          +{" "}
          <Link
            href={`/hiveswap/aspect/${trueSign.aspect.name}`}
            onClick={(e) => e.stopPropagation()}
          >
            {trueSign.aspect.name}
          </Link>
        </p>
      </Flexbox>
    </button>
  );
}
