"use client";

import Box from "@/components/Box/Box";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Box title={error.name} primary>
      {error.message}
      <i>
        <p>K4RK4T IS M4SHING MY K3YBOSDVFDNFLBLGBGSDGFSB['A</p>
        <p>AKJFA</p>
        <p>SEUFHWEUIONDN</p>
        <p>AUIHDF</p>
        <p>SDSAD</p> <p>4444UGH H3 1S SUCH 4 L1TTL3SDKJGBSDJKBG</p>
      </i>
      <img src="/assets/404/smash.webp" />
    </Box>
  );
}
