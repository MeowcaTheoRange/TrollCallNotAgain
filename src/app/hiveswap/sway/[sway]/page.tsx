import Box from "@/components/Box/Box";
import Flexbox from "@/components/Flexbox/Flexbox";
import { Sway } from "@/types/assist/extended_zodiac";
import { notFound } from "next/navigation";

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
