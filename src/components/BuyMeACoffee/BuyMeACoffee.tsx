"use client";

import { useEffect, useState } from "react";
import Box from "../Box/Box";

export default function BuyMeACoffee() {
  const [hiddenCoffee, setHiddenCoffee] = useState(true);
  useEffect(() => {
    setHiddenCoffee(window?.localStorage.getItem("hiddenCoffee") === "true");
  }, []);
  return hiddenCoffee ? (
    <></>
  ) : (
    <Box title="Buy Me A Coffee" small>
      <p>
        Hi! Thanks for using TrollCall! If you like this site, why not{" "}
        <a href="https://www.buymeacoffee.com/trollcall" target="_blank">
          💻 buy the developer of TrollCall a <b>sensible codebase</b>
        </a>
        ?
      </p>
      <p>
        <a
          href="javascript:;"
          onClick={() => {
            window.localStorage.setItem("hiddenCoffee", "true");
            setHiddenCoffee(true);
          }}
        >
          No thanks
        </a>
      </p>
    </Box>
  );
}
