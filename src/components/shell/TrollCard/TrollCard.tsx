import { Color3 } from "@/types/assist/color";
import "./TrollCard.css";
import { ClientTroll } from "@/types/troll";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function TrollCard({ troll }: { troll: ClientTroll }) {
  const trollColor = Color3.fromRGB(
    ...(troll.textColor ??
      troll.falseSign?.color.color ??
      troll.trueSign.color.color)
  );
  return (
    <div
      className="TrollCard"
      style={
        {
          "--pri-box": `#${trollColor.darken(60).toHex()}`,
          "--pri-text": `#${trollColor.lighten(60).toHex()}`,
        } as React.CSSProperties
      }
    >
      <h1>{troll.name.join(" ")}</h1>
      <div className="imagedesc">
        <span>[Placeholder]</span>
        <div>
          <ReactMarkdown>{troll.description}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
