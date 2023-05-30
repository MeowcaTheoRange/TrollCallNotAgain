"use client";

import Box from "@/components/Box/Box";
import styles from "@/styles/page.module.css";
import { name } from "@/types/assist/branding";
import { useSession } from "next-auth/react";

export default function Home() {
  return (
    <Box title={`Hello, new user!`} primary>
      Welcome to {name}!
    </Box>
  );
}
