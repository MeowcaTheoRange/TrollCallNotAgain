import Link from "next/link";
import "./Nav.css";
import { brand } from "@/types/assist/branding";

export default function Nav() {
  return (
    <div className="Nav">
      <div className="left">
        <span className="logo">
          <Link href="/">{brand.name}</Link>
        </span>
        <span className="path">Path 1</span>
        <span className="path">Path 2</span>
        <span className="path">Path 3</span>
      </div>
      <div className="right">
        <span className="path">Hello, testing!</span>
      </div>
    </div>
  );
}
