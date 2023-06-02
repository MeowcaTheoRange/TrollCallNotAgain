"use client";

import { Color3, ColorTypes } from "@/types/assist/color";

export default function ColorManager({
  mainColor,
}: {
  mainColor: [number, number, number];
}) {
  var clonedColor = Color3.fromRGB(...mainColor);
  return (
    <style jsx global>{`
      :root {
        --pri-box: #${clonedColor.darken(60).toHex()};
        --pri-text: #${clonedColor.lighten(60).toHex()};
      }
    `}</style>
  );
}
