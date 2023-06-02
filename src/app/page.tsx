import Box from "@/components/Box/Box";
import { brand } from "@/types/assist/branding";
import ColorManager from "@/components/ColorManager/ColorManager";

export default function Home() {
  return (
    <>
      <ColorManager mainColor={[0xff, 0xff, 0xe0]} />
      <Box title={`Hello!`} primary>
        Welcome back to {brand.name}!
      </Box>
    </>
  );
}
