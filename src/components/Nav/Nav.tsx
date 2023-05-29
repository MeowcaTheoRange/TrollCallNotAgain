import Link from "next/link";
import "./Nav.css";

export default function Nav() {
  return (
    <div className="Nav">
      <span className="logo">
        <Link href="/">TROLLCALL</Link>
      </span>
      <span className="place">This is what in where you are.</span>
      <span className="path">This is where you are.</span>
    </div>
  );
}
