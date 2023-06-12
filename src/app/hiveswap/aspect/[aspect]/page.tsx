import Box from "@/components/Box/Box";
import Flexbox from "@/components/Flexbox/Flexbox";
import SignBadge from "@/components/SignBadge/SignBadge";
import { Aspect, TrueSign, TrueSignList } from "@/types/assist/extended_zodiac";
import { notFound } from "next/navigation";

export default function AspectPage({ params }: { params: { aspect: string } }) {
  var gottenAspect = Aspect[params.aspect];
  if (gottenAspect == null) return notFound();
  return (
    <>
      <Box title={gottenAspect.name} primary>
        <Flexbox gap="16px">
          <img
            className="icon"
            width={96}
            height={96}
            src={`/assets/aspect/${gottenAspect.name}.svg`}
            alt={gottenAspect.name}
          ></img>
          <p>{gottenAspect.description}</p>
        </Flexbox>
      </Box>
      <Box title={gottenAspect.name + "-bound"}>
        <Flexbox gap="16px" wrap justify="space-around">
          {TrueSignList.map((signName, i) =>
            TrueSign[signName].aspect.name === gottenAspect.name ? (
              <SignBadge key={i} trueSign={TrueSign[signName]} />
            ) : (
              <></>
            )
          )}
        </Flexbox>
      </Box>
    </>
  );
}
