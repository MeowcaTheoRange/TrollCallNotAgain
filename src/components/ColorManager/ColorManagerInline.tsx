import { Color3 } from "@/types/assist/color";
import { CSSProperties } from "react";

export default function ColorManagerInline({
  mainColor,
  secColor,
  jsx,
}: {
  mainColor: [number, number, number];
  secColor?: [number, number, number];
  jsx?: boolean;
}) {
  var clonedMainColor = Color3.fromRGB(...mainColor);
  var clonedSecColor;
  if (secColor != null) clonedSecColor = Color3.fromRGB(...secColor);
  if (jsx)
    return {
      backgroundColor: "#" + clonedMainColor.darken(60).toHex(),
      color: "#" + clonedMainColor.lighten(60).toHex(),
    } as CSSProperties;
  return `--pri-box: #${clonedMainColor.darken(60).toHex()};
--pri-text: #${clonedMainColor.lighten(60).toHex()};
${
  clonedSecColor
    ? `--sec-box: #${clonedSecColor.darken(60).toHex()};
--sec-text: #${clonedSecColor.lighten(60).toHex()};`
    : ``
}`;
}
