import Link from "next/link";
import "./Nav.css";
import { brand } from "@/types/assist/branding";
import Flexbox from "../Flexbox/Flexbox";

export default function Nav() {
  return (
    <div className="Nav">
      <Flexbox align="center" wrap gap="16px">
        <span className="logo">
          <Link href="/">{brand.name}</Link>
        </span>
        <span className="path">Path 1</span>
        <span className="path">Path 2</span>
        <span className="path">Path 3</span>
      </Flexbox>
      <Flexbox align="center" wrap gap="16px" justify="flex-end">
        <span className="path">Hello, testing!</span>
      </Flexbox>
    </div>
  );
}
