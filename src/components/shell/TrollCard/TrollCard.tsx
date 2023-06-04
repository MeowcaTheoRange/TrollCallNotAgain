"use client";

import { Color3 } from "@/types/assist/color";
import "./TrollCard.css";
import { ClientTroll } from "@/types/troll";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useRouter } from "next/navigation";
import {
  HeightConverter,
  PronounGrouper,
  AgeConverter,
} from "@/types/assist/language";
import SignBadge from "@/components/SignBadge/SignBadge";
import Link from "next/link";
import Flexbox from "@/components/Flexbox/Flexbox";
import Flair from "../Flair/Flair";

export default function TrollCard({
  troll,
  inline,
}: {
  troll: ClientTroll;
  inline?: boolean;
}) {
  var trollTrueSign = troll.falseSign ?? troll.trueSign;
  const trollColor = Color3.fromRGB(...trollTrueSign.color.color);
  return (
    <div
      className="TrollCard largelink"
      style={
        {
          "--pri-box": `#${trollColor.darken(60).toHex()}`,
          "--pri-text": `#${trollColor.lighten(60).toHex()}`,
        } as React.CSSProperties
      }
    >
      <Flexbox gap="8px" direction="row" align="center">
        {inline ? (
          <h1>{troll.name.join(" ")}</h1>
        ) : (
          <Link href={`/user/${troll.owners[0].name}/troll/${troll.name[0]}`}>
            <h1>{troll.name.join(" ")}</h1>
          </Link>
        )}
        <span>
          <i>({troll.pronunciation.join(" ")})</i>
        </span>
      </Flexbox>
      <Flexbox gap="16px" direction="row">
        {troll.flairs.map((flair, i) => (
          <Flair key={i} flair={flair} />
        ))}
      </Flexbox>
      <Flexbox gap={inline ? "0px" : "8px"} fw wrap>
        {inline ? (
          <></>
        ) : (
          <img className="image" src={troll.image} height="256"></img>
        )}
        <Flexbox
          direction="column"
          gap="8px"
          padding="8px"
          fw
          min="min-content"
        >
          <Flexbox justify="space-between" align="center" gap="8px" fw wrap>
            <Flexbox direction="column" gap="8px" min="min-content">
              <ul>
                {troll.facts.map((fact, i) => (
                  <li key={i}>{fact}</li>
                ))}
              </ul>
            </Flexbox>
            <Flexbox direction="column" gap="8px" align="flex-end">
              {troll.falseSign ? (
                <>
                  <p>FALSE SIGN</p>
                  <SignBadge trueSign={troll.falseSign} />
                </>
              ) : (
                <></>
              )}
              <p>TRUE SIGN</p>
              <SignBadge trueSign={troll.trueSign} />
            </Flexbox>
          </Flexbox>
          <Flexbox gap="8px" justify="center" fw wrap>
            <span>
              {troll.pronouns
                .map((pronoun) => PronounGrouper(pronoun))
                .join(", ")}
            </span>
            <span>•</span>
            <span>{troll.gender}</span>
            <span>•</span>
            <span title={AgeConverter(troll.age, true)}>
              {AgeConverter(troll.age, false)}
            </span>
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
          </Flexbox>
          <Flexbox direction="column" gap="8px" padding="8px">
            <ReactMarkdown>{troll.description}</ReactMarkdown>
          </Flexbox>
        </Flexbox>
      </Flexbox>
    </div>
  );
}
