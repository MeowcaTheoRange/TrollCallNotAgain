import { ReactNode } from "react";
import "./Box.css";

export default function Box({
  title,
  children,
  hr,
  primary,
  small,
  noBG,
}: {
  title?: string;
  children?: ReactNode;
  hr?: boolean;
  primary?: boolean;
  small?: boolean;
  noBG?: boolean;
}) {
  return (
    <div className={`Box${primary ? " primary" : ""}${noBG ? "" : " solid"}`}>
      {title && <p className={`title${small ? " small" : ""}`}>{title}</p>}
      {hr && <hr />}
      <div className="children">{children}</div>
    </div>
  );
}
