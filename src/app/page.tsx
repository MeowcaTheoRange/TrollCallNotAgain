"use client";

import Box from "@/components/Box/Box";
import styles from "@/styles/page.module.css";
import { name } from "@/types/assist/branding";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();

  return (
    <Box title={`Hello, ${data?.user?.name ?? "user"}!`} primary>
      Welcome back to {name}!
    </Box>
  );
}
