import Box from "@/components/Box/Box";
import Nav from "@/components/Nav/Nav";
import "@/styles/globals.css";
import "@/styles/normalize.css";
import { name } from "@/types/assist/branding";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <div className="layout">
          {children}
          <Box title={name}>I'm a footer!</Box>
        </div>
      </body>
    </html>
  );
}
