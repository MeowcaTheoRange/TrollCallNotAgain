import { Color3 } from "@/types/assist/color";
import { ClientFlair } from "@/types/flair";
import Link from "next/link";
import "./Flair.css";

export default function Flair({ flair }: { flair: ClientFlair }) {
  var flairColor = Color3.fromRGB(...flair.color);
  var flairElement = (
    <div
      className={`Flair`}
      title={flair.alt}
      style={
        {
          "--pri-box": `#${flairColor.darken(60).toHex()}`,
          "--pri-text": `#${flairColor.lighten(60).toHex()}`,
        } as React.CSSProperties
      }
    >
      {flair.name}
    </div>
  );
  if (flair.link != null && flair.link.length > 0)
    return <Link href={flair.link}>{flairElement}</Link>;
  return flairElement;
}
