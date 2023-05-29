import Link from "next/link";
import "./Nav.css";
import { name } from "@/types/assist/branding";

export default function Nav() {
  return (
    <div className="Nav">
      <span className="logo">
        <Link href="/">{name}</Link>
      </span>
      <span className="place">Test</span>
      <span className="path">Test, test</span>
    </div>
  );
}
