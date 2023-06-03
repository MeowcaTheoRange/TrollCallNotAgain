import Box from "@/components/Box/Box";
import { Aspect } from "@/types/assist/extended_zodiac";
import Image from "next/image";
import { notFound } from "next/navigation";
import ColorManager from "@/components/ColorManager/ColorManager";

export default function AspectPage({ params }: { params: { aspect: string } }) {
  var gottenAspect = Aspect[params.aspect];
  if (gottenAspect == null) return notFound();
  return (
    <>
      <Box title={gottenAspect.name} primary>
        <div className="paragraph">
          <img
            className="icon"
            width={96}
            height={96}
            src={`/assets/aspect/${gottenAspect.name}.svg`}
            alt={gottenAspect.name}
          ></img>
          <p>{gottenAspect.description}</p>
        </div>
      </Box>
    </>
  );
}
