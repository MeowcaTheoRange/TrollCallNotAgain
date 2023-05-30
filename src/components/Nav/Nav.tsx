"use client";

import Link from "next/link";
import "./Nav.css";
import { name } from "@/types/assist/branding";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Nav() {
  const { data } = useSession();

  return (
    <div className="Nav">
      <div className="left">
        <span className="logo">
          <Link href="/">{name}</Link>
        </span>
        <span className="path">Path 1</span>
        <span className="path">Path 2</span>
        <span className="path">Path 3</span>
      </div>
      <div className="right">
        <span className="path">
          {data?.user ? (
            <>
              Hello, {data.user.name ?? "user"}!{" - "}
              <Link href="" onClick={() => signOut()}>
                Sign Out
              </Link>
            </>
          ) : (
            <Link
              href=""
              onClick={() =>
                signIn("discord", { callbackUrl: "/auth/newUser/" })
              }
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
}
