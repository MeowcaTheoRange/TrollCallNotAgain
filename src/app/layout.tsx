import Nav from "@/components/Nav/Nav";
import "@/styles/globals.css";
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
        <div className="layout">{children}</div>
      </body>
    </html>
  );
}
