import Box from "@/components/Box/Box";
import { Sway } from "@/types/assist/extended_zodiac";
import Image from "next/image";
import { notFound } from "next/navigation";
import ColorManager from "@/components/ColorManager/ColorManager";
import Flexbox from "@/components/Flexbox/Flexbox";

export default function SwayPage({ params }: { params: { sway: string } }) {
  var gottenSway = Sway[params.sway];
  if (gottenSway == null) return notFound();
  return (
    <>
      <Box title={gottenSway.name} primary>
        <Flexbox gap="16px">
          <img
            className="icon"
            width={96}
            height={96}
            src={`/assets/sway/${gottenSway.name}.png`}
            alt={gottenSway.name}
          ></img>
          <p>{gottenSway.description}</p>
        </Flexbox>
      </Box>
    </>
  );
}
