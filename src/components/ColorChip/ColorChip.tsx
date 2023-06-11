import { CSSProperties } from "react";
import ColorManagerInline from "../ColorManager/ColorManagerInline";
import "./ColorChip.css";

export default function ColorChip({
  mainColor,
}: {
  mainColor: [number, number, number];
}) {
  return (
    <div
      className="ColorChip"
      style={
        ColorManagerInline({ jsx: true, mainColor: mainColor }) as CSSProperties
      }
    >
      <h1>Hello, world!</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </div>
  );
}
