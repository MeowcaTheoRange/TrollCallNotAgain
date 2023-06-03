"use client";

import ColorManagerInline from "./ColorManagerInline";

export default function ColorManager({
  mainColor,
  secColor,
}: {
  mainColor: [number, number, number];
  secColor?: [number, number, number];
}) {
  return (
    <style jsx global>{`
      :root {
        ${ColorManagerInline({ mainColor, secColor })}
      }
    `}</style>
  );
}
