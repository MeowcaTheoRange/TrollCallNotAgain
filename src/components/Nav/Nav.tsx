import { brand } from "@/types/assist/branding";
import { cookies } from "next/headers";
import Link from "next/link";
import Flexbox from "../Flexbox/Flexbox";
import "./Nav.css";

export default function Nav() {
  const cookieStore = cookies();
  var userName = cookieStore.get("TROLLCALL_NAME")?.value;
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
        {userName != null ? (
          <>
            <Link href={"/user/" + userName}>↓ {userName}</Link>
            <Link href="/submit/user">↑ Account</Link>
            <Link href="/about/logout">← Log Out</Link>
          </>
        ) : (
          <>
            <Link href="/about/login">→ Log In</Link>
            <Link href="/submit/user">↑ Sign Up</Link>
          </>
        )}
      </Flexbox>
    </div>
  );
}
