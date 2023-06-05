import { parseQuirk } from "@/lib/trollcall/quirks";
import { ClientDialog } from "@/types/dialoglog";
import { ReactNode } from "react";
import "./Dialoglog.css";

// this is VERY messy

export default function Dialoglog({ dialoglog }: { dialoglog: ClientDialog }) {
  console.log(dialoglog);
  var characterData = dialoglog.characters.map((x) => ({
    fullUsername: (x.time ? x.time + " " : "") + x.troll.username,
    username:
      (x.time[0] ?? "") +
      x.troll.username
        .replace(/^(([a-z])[a-z]+)(([A-Z])[a-z]+)$/, "$2$4")
        .toUpperCase(),
    hasResponded: false,
    thisCharacter: x,
    color:
      "rgb(" +
      (
        x.troll.textColor ??
        (x.troll.falseSign?.color.color ?? x.troll.trueSign?.color.color).map(
          (y) => (y / 0xff) * 0xa1
        )
      ).join(", ") +
      ")",
  }));

  // first character
  return (
    <div className="Dialoglog">
      {dialoglog.characters.length > 2 ? (
        <p>
          --{" "}
          <span
            style={{
              color: characterData[0].color,
            }}
          >
            {characterData[0].fullUsername} [{characterData[0].username}]
          </span>{" "}
          opened memo on board{" "}
          <span title={dialoglog.description}>{dialoglog.name}</span>. --
        </p>
      ) : dialoglog.characters.length < 2 ? (
        <p>
          <span
            style={{
              color: "#888",
            }}
          >
            <i>
              // Note To Self --{" "}
              <span title={dialoglog.description}>{dialoglog.name}</span>
            </i>
          </span>
        </p>
      ) : (
        <p>
          --{" "}
          <span
            style={{
              color: characterData[0].color,
            }}
          >
            {characterData[0].fullUsername} [{characterData[0].username}]
          </span>{" "}
          began trolling{" "}
          <span
            style={{
              color: characterData[0].color,
            }}
          >
            {characterData[0].fullUsername} [{characterData[0].username}]
          </span>
          . --
        </p>
      )}
      {dialoglog.log.map((speech) => {
        if (speech.character == null)
          return <p>-- {jsonPathFinder(characterData, speech.text)} --</p>;
        var thisCharacterData = characterData[speech.character];
        var joinedThing: ReactNode = "";
        if (
          dialoglog.characters.length > 2 &&
          speech.character > 0 &&
          !thisCharacterData.hasResponded
        ) {
          joinedThing = (
            <p>
              --{" "}
              <span
                style={{
                  color: thisCharacterData.color,
                }}
              >
                {thisCharacterData.fullUsername} [{thisCharacterData.username}]
              </span>{" "}
              responded to memo. --
            </p>
          );
          thisCharacterData.hasResponded = true;
        }
        return (
          <>
            {joinedThing}
            <p
              style={{
                color: thisCharacterData.color,
              }}
            >
              {thisCharacterData.username}:{" "}
              {parseQuirk(
                jsonPathFinder(characterData, speech.text),
                thisCharacterData.thisCharacter.troll.quirks[speech.quirk]
              )}
            </p>
          </>
        );
      })}
      {dialoglog.characters.length === 2 ? (
        <p>
          --{" "}
          <span
            style={{
              color: characterData[0].color,
            }}
          >
            {characterData[0].fullUsername} [{characterData[0].username}]
          </span>{" "}
          stopped trolling{" "}
          <span
            style={{
              color: characterData[0].color,
            }}
          >
            {characterData[0].fullUsername} [{characterData[0].username}]
          </span>
          . --
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}

function jsonPathFinder(characterData: any, string: string) {
  return string.replace(/(?<!\\){{(.+)}}/gm, (_, p1) => {
    var pathObject = characterData;
    p1.split(".").forEach((fragment: string) => {
      if (pathObject == null || pathObject[fragment] == null) return;
      pathObject = pathObject[fragment];
    });
    return pathObject;
  });
}
