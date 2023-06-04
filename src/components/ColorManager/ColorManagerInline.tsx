import { Color3 } from "@/types/assist/color";

export default function ColorManagerInline({
  mainColor,
  secColor,
}: {
  mainColor: [number, number, number];
  secColor?: [number, number, number];
}) {
  var clonedMainColor = Color3.fromRGB(...mainColor);
  var clonedSecColor;
  if (secColor != null) clonedSecColor = Color3.fromRGB(...secColor);
  return `--pri-box: #${clonedMainColor.darken(60).toHex()};
--pri-text: #${clonedMainColor.lighten(60).toHex()};
${
  clonedSecColor
    ? `--sec-box: #${clonedSecColor.darken(60).toHex()};
--sec-text: #${clonedSecColor.lighten(60).toHex()};`
    : ``
}`;
}
