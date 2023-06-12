import Box from "@/components/Box/Box";
import ColorManager from "@/components/ColorManager/ColorManager";
import Flexbox from "@/components/Flexbox/Flexbox";
import Dialoglog from "@/components/shell/Dialoglog/Dialoglog";
import TrollCard from "@/components/shell/TrollCard/TrollCard";
import UserCard from "@/components/shell/UserCard/UserCard";
import {
  ServerTrollToClientTroll,
  getTrollByName,
} from "@/lib/trollcall/troll";
import { getUserByName } from "@/lib/trollcall/user";
import { ProperNounCase } from "@/types/assist/language";
import { iswitch } from "iswitch";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UserPage({
  params,
}: {
  params: { troll: string; user: string };
}) {
  var initialUser = await getUserByName(params.user);
  if (initialUser == null) return notFound();
  var initialTroll = await getTrollByName(params.troll, initialUser);
  if (initialTroll == null) return notFound();
  var troll = await ServerTrollToClientTroll(initialTroll);

  var trollTrueSign = troll.falseSign ?? troll.trueSign;
  return (
    <>
      <ColorManager mainColor={trollTrueSign.color.color} />
      <TrollCard troll={troll} inline />
      <Flexbox gap="8px" justify="center" align="center" fw wrap>
        <img src={troll.image} width="256"></img>
        <Flexbox direction="column" gap="8px" fw min="min-content">
          <Box title={"About " + troll.name[0]}>
            <p>
              {ProperNounCase(troll.name[0])} is a{" "}
              <Link href={`/hiveswap/class/${troll.class.name}`}>
                {troll.class.name}
              </Link>{" "}
              of{" "}
              <Link href={`/hiveswap/aspect/${troll.trueSign.aspect.name}`}>
                {troll.trueSign.aspect.name}
              </Link>
              .
            </p>
            <Box title="Policies" small noBG>
              <Flexbox gap="8px" align="center">
                <span className="material" title={troll.policies.fanart}>
                  {iswitch(
                    troll.policies.fanart,
                    ["no", () => "close"],
                    ["yes", () => "done"],
                    ["ask", () => "question_mark"]
                  )}
                </span>
                <span>
                  You{" "}
                  {iswitch(
                    troll.policies.fanart,
                    ["no", () => "can't"],
                    ["yes", () => "can"],
                    ["ask", () => "might be able to"]
                  )}{" "}
                  draw fanart of {troll.pronouns[0][1]}.
                </span>
              </Flexbox>
              <Flexbox gap="8px" align="center">
                <span className="material" title={troll.policies.fanartOthers}>
                  {iswitch(
                    troll.policies.fanartOthers,
                    ["no", () => "close"],
                    ["yes", () => "done"],
                    ["ask", () => "question_mark"]
                  )}
                </span>
                <span>
                  You{" "}
                  {iswitch(
                    troll.policies.fanartOthers,
                    ["no", () => "can't"],
                    ["yes", () => "can"],
                    ["ask", () => "might be able to"]
                  )}{" "}
                  draw fanart of {troll.pronouns[0][1]} with other characters.
                </span>
              </Flexbox>
              <Flexbox gap="8px" align="center">
                <span className="material" title={troll.policies.kinning}>
                  {iswitch(
                    troll.policies.kinning,
                    ["no", () => "close"],
                    ["yes", () => "done"],
                    ["ask", () => "question_mark"]
                  )}
                </span>
                <span>
                  You{" "}
                  {iswitch(
                    troll.policies.kinning,
                    ["no", () => "can't"],
                    ["yes", () => "can"],
                    ["ask", () => "might be able to"]
                  )}{" "}
                  kin {ProperNounCase(troll.name[0])}.
                </span>
              </Flexbox>
              <Flexbox gap="8px" align="center">
                <span className="material" title={troll.policies.shipping}>
                  {iswitch(
                    troll.policies.shipping,
                    ["no", () => "close"],
                    ["yes", () => "done"],
                    ["ask", () => "question_mark"]
                  )}
                </span>
                <span>
                  You{" "}
                  {iswitch(
                    troll.policies.shipping,
                    ["no", () => "can't"],
                    ["yes", () => "can"],
                    ["ask", () => "might be able to"]
                  )}{" "}
                  ship {troll.pronouns[0][1]} with other characters.
                </span>
              </Flexbox>
              <Flexbox gap="8px" align="center">
                <span className="material" title={troll.policies.fanfiction}>
                  {iswitch(
                    troll.policies.fanfiction,
                    ["no", () => "close"],
                    ["yes", () => "done"],
                    ["ask", () => "question_mark"]
                  )}
                </span>
                <span>
                  You{" "}
                  {iswitch(
                    troll.policies.fanfiction,
                    ["no", () => "can't"],
                    ["yes", () => "can"],
                    ["ask", () => "might be able to"]
                  )}{" "}
                  make fanfiction including {troll.pronouns[0][1]}.
                </span>
              </Flexbox>
            </Box>
            <Box title="Preferences" small noBG>
              {troll.preferences.love.map((pref, i) => (
                <Flexbox key={i} gap="8px" align="center">
                  <span className="material" title={"Loves"}>
                    thumb_up
                  </span>
                  <span>{pref}</span>
                </Flexbox>
              ))}
              {troll.preferences.hate.map((pref, i) => (
                <Flexbox key={i} gap="8px" align="center">
                  <span className="material" title={"Hates"}>
                    thumb_down
                  </span>
                  <span>{pref}</span>
                </Flexbox>
              ))}
            </Box>
          </Box>
        </Flexbox>
      </Flexbox>
      <Flexbox>
        <Dialoglog
          dialoglog={{
            owners: troll.owners,
            name: "Quirk Displayer",
            description: "Test display for a character's quirks.",
            characters: [{ troll: troll, time: "" }],
            log: Object.keys(troll.quirks).map((name) => ({
              character: 0,
              quirk: name,
              text:
                "Hi, I'm {{0.fullUsername}}. This is me testing my " +
                name +
                " quirk. The quick brown fox jumped over the lazy dog.",
            })),
          }}
        />
      </Flexbox>
      <Box title={"Owner" + (troll.owners.length > 1 ? "s" : "")}>
        {troll.owners.map((owner, i) => (
          <UserCard user={owner} key={i} />
        ))}
      </Box>
    </>
  );
}
