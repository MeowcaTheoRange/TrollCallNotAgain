import ColorManager from "@/components/ColorManager/ColorManager";
import "@/styles/form.css";
import "@/styles/globals.css";
import "@/styles/normalize.css";

export const metadata = {
  title: "Submit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ColorManager
        mainColor={[0xff, 0xff, 0x40]}
        secColor={[0xff, 0xff, 0xc0]}
      />
      {children}
    </>
  );
}
