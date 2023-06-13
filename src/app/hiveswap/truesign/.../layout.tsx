import "@/styles/globals.css";
import "@/styles/normalize.css";

export const metadata = {
  title: "All True Signs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
