import Flexbox from "@/components/Flexbox/Flexbox";
import SignBadge from "@/components/SignBadge/SignBadge";
import { Color3 } from "@/types/assist/color";
import { ClientUser } from "@/types/user";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Flair from "../Flair/Flair";
import "./UserCard.css";

export default function UserCard({
  user,
  inline,
}: {
  user: ClientUser;
  inline?: boolean;
}) {
  var color = Color3.fromRGB(...user.color);
  return (
    <div
      className="UserCard largelink"
      style={
        {
          "--pri-box": `#${color.darken(60).toHex()}`,
          "--pri-text": `#${color.lighten(60).toHex()}`,
        } as React.CSSProperties
      }
    >
      {inline ? (
        <h1>{user.name}</h1>
      ) : (
        <Link href={`/user/${user.name}`}>
          <h1>{user.name}</h1>
        </Link>
      )}
      <Flexbox gap="8px" direction="row">
        {user.flairs.map((flair, i) => (
          <Flair key={i} flair={flair} />
        ))}
      </Flexbox>
      <Flexbox gap="8px" wrap>
        <Flexbox gap="8px" align="center" justify="space-between" fw>
          {user.pfp ? (
            <img
              alt=""
              className="ugc"
              src={user.pfp}
              width="150"
              height="150"
            />
          ) : (
            <></>
          )}
          <Flexbox direction="column" gap="8px" align="flex-end">
            <p>TRUE SIGN</p>
            <SignBadge trueSign={user.trueSign} />
          </Flexbox>
        </Flexbox>
        <Flexbox fw direction="column" gap="8px" padding="8px" wrap>
          <Flexbox direction="column" gap="8px" min="15ch">
            {user.url ? (
              <p>
                at{" "}
                <Link href={user.url} target="_blank">
                  {user.url}
                </Link>
              </p>
            ) : (
              <></>
            )}
            <Flexbox direction="column" gap="8px" padding="8px">
              <ReactMarkdown>{user.description}</ReactMarkdown>
            </Flexbox>
          </Flexbox>
        </Flexbox>
      </Flexbox>
    </div>
  );
}
