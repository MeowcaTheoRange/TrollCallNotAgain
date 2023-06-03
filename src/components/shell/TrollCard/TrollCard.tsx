"use client";

import { Color3 } from "@/types/assist/color";
import "./TrollCard.css";
import { ClientTroll } from "@/types/troll";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useRouter } from "next/navigation";
import { HeightConverter, PronounGrouper } from "@/types/assist/language";
import SignBadge from "@/components/SignBadge/SignBadge";

export default function TrollCard({ troll }: { troll: ClientTroll }) {
  const router = useRouter();
  var trollTrueSign = troll.falseSign ?? troll.trueSign;
  const trollColor = Color3.fromRGB(
    ...(troll.textColor ?? trollTrueSign.color.color)
  );
  return (
    <button
      className="TrollCard largelink"
      style={
        {
          "--pri-box": `#${trollColor.darken(60).toHex()}`,
          "--pri-text": `#${trollColor.lighten(60).toHex()}`,
        } as React.CSSProperties
      }
      onClick={() =>
        router.push(`/user/${troll.owners[0].name}/troll/${troll.name[0]}`)
      }
    >
      <h1>{troll.name.join(" ")}</h1>
      <div className="imagedesc">
        <img className="image" src={troll.image} height="256"></img>
        <div className="moreflex">
          <SignBadge trueSign={trollTrueSign} />
          <div className="imagedesc wrap">
            <span>
              {troll.pronouns
                .map((pronoun) => PronounGrouper(pronoun))
                .join(", ")}
            </span>
            <span>•</span>
            <span>{troll.gender}</span>
            <span>•</span>
            <span>{HeightConverter(troll.height)}</span>
            {troll.species ? (
              <>
                <span>•</span>
                <span>{troll.species}</span>
              </>
            ) : (
              <></>
            )}
          </div>
          <div>
            <ReactMarkdown>{troll.description}</ReactMarkdown>
          </div>
        </div>
      </div>
    </button>
  );
}

export function TrollCard_Loading() {
  return (
    <div className="TrollCard largelink loading">
      <h1>STINKY AMONGU</h1>
      <div className="imagedesc">
        <div className="loadingpatch"></div>
        <div className="moreflex">
          <div className="morbius">
            <div className="loadingpatchsign"></div>
            <div className="morbiusvert">
              <h2>Stinkypoop</h2>
              <p>Fart + Poop + Pee</p>
            </div>
          </div>
          <div className="imagedesc">
            <span>he/him, they/them</span>
            <span>•</span>
            <span>Male</span>
            <span>•</span>
            <span>5'9" (1.75m)</span>
          </div>
          <div>
            <ReactMarkdown>
              I wasn't paid well enough to type this stuff out
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
