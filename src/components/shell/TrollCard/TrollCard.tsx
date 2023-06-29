"use client";

import Flexbox from "@/components/Flexbox/Flexbox";
import SignBadge from "@/components/SignBadge/SignBadge";
import { Color3 } from "@/types/assist/color";
import {
  AgeConverter,
  HeightConverter,
  PesterchumNameFormatter,
  PronounGrouper,
} from "@/types/assist/language";
import { ClientTroll } from "@/types/troll";
import Link from "next/link";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Flair from "../Flair/Flair";
import "./TrollCard.css";

export default function TrollCard({
  troll,
  inline,
}: {
  troll: ClientTroll;
  inline?: boolean;
}) {
  var trollTrueSign = troll.falseSign ?? troll.trueSign;
  const trollColor = Color3.fromRGB(...trollTrueSign.color.color);
  var [showMore, setShowMore] = useState(false);
  var descArray = troll.description.split(" ");
  var smallDesc = descArray.slice(0, 100);
  var requiredSlice = descArray.length !== smallDesc.length;
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
      <Flexbox gap="8px" direction="row" align="center" justify="flex-start">
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
      <Flexbox gap="8px" direction="row">
        {troll.flairs.map((flair, i) => (
          <Flair key={i} flair={flair} />
        ))}
      </Flexbox>
      <Flexbox gap={inline ? "0px" : "8px"} fw wrap>
        {inline ? (
          <></>
        ) : (
          <img className="image ugc" src={troll.image} height="256"></img>
        )}
        <Flexbox
          direction="column"
          gap="8px"
          padding="8px"
          fw
          min="min-content"
          wrap
        >
          <Flexbox
            justify="space-between"
            align="flex-start"
            gap="16px"
            fw
            wrap
          >
            <Flexbox direction="column" gap="8px" align="flex-start">
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
            <Flexbox direction="column" gap="8px" min="20ch">
              <ul>
                {troll.facts.map((fact, i) => (
                  <li key={i}>{fact}</li>
                ))}
              </ul>
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
          <Flexbox justify="center" fw wrap>
            <p>
              Known as <span>{PesterchumNameFormatter(troll.username)}</span>{" "}
              online.
            </p>
          </Flexbox>
        </Flexbox>
      </Flexbox>
      <Flexbox direction="column" gap="8px" padding="8px">
        <ReactMarkdown>
          {(requiredSlice && showMore ? descArray : smallDesc).join(" ")}
        </ReactMarkdown>
        {requiredSlice ? (
          !showMore ? (
            <>
              <button className="inline" onClick={() => setShowMore(true)}>
                Show More
              </button>
            </>
          ) : (
            <>
              <button className="inline" onClick={() => setShowMore(false)}>
                Show Less
              </button>
            </>
          )
        ) : (
          <></>
        )}
      </Flexbox>
    </div>
  );
}
