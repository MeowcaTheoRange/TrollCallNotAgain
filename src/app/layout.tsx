import AuthContext from "@/components/AuthContext/AuthContext";
import Footer from "@/components/Footer/Footer";
import Nav from "@/components/Nav/Nav";
import "@/styles/globals.css";
import "@/styles/normalize.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <Nav />
          <div className="layout">
            {children}
            <Footer />
          </div>
        </AuthContext>
      </body>
    </html>
  );
}
