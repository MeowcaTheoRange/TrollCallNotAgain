import Footer from "@/components/Footer/Footer";
import Nav from "@/components/Nav/Nav";
import "@/styles/globals.css";
import "@/styles/normalize.css";

export const metadata = {
  title: "TrollCall Home",
};

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
          <Footer />
        </div>
      </body>
    </html>
  );
}
