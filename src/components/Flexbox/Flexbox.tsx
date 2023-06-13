import { ReactNode } from "react";
import "./Flexbox.css";

export default function Flexbox({
  children,
  direction,
  gap,
  align,
  justify,
  padding,
  fw,
  wrap,
  min,
  max,
}: {
  children: ReactNode;
  direction?: string;
  gap?: string;
  align?: string;
  justify?: string;
  padding?: string;
  fw?: boolean;
  wrap?: boolean;
  min?: string;
  max?: string;
}) {
  return (
    <div
      className={`Flexbox`}
      style={
        {
          flexDirection: direction,
          gap: gap,
          alignItems: align,
          justifyContent: justify,
          padding: padding,
          width: fw ? "100%" : undefined,
          flexWrap: wrap ? "wrap" : "nowrap",
          minWidth: min,
          maxWidth: max,
          flexBasis: min,
          flexGrow: min ? "1" : 0,
          // ...(wrap ? { flexShrink: "55" } : {}),
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
