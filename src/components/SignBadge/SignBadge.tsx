"use client";

import { TrueSignType } from "@/types/assist/extended_zodiac";
import "./SignBadge.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignBadge({ trueSign }: { trueSign: TrueSignType }) {
  const router = useRouter();
  return (
    <button
      className="SignBadge"
      onClick={(e) => {
        router.push(`/hiveswap/truesign/${trueSign.name}`);
        e.stopPropagation();
      }}
    >
      <img
        className="icon"
        src={`/assets/signs/${trueSign.color.name}/${trueSign.name}.svg`}
        height="64"
        width="64"
      ></img>
      <div className="morbiusvert">
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
      </div>
    </button>
  );
}
