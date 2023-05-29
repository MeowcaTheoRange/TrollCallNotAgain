import { ReactNode } from "react";
import "./Box.css";

export default function Box({
  title,
  children,
  hr,
  primary,
}: {
  title?: string;
  children?: ReactNode;
  hr?: boolean;
  primary?: boolean;
}) {
  return (
    <div className={`Box${primary ? " primary" : ""}`}>
      {title && <p className="title">{title}</p>}
      {hr ? <hr /> : <hr className="hidden" />}
      <div className="children">{children}</div>
    </div>
  );
}
