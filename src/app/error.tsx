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
    </Box>
  );
}
