import { ReactNode } from "react";
import Flexbox from "../Flexbox/Flexbox";
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
      <Flexbox fw direction="column" gap="8px" padding="8px">
        {children}
      </Flexbox>
    </div>
  );
}
