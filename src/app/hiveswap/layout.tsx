import ColorManager from "@/components/ColorManager/ColorManager";
import "@/styles/globals.css";
import "@/styles/normalize.css";

export const metadata = {
  title: "Hiveswap Resources",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ColorManager
        mainColor={[0x80, 0x00, 0xff]}
        secColor={[0xc0, 0xc0, 0xff]}
      />
      {children}
    </>
  );
}
