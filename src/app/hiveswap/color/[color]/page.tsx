import Box from "@/components/Box/Box";
import { SignColor, Sway } from "@/types/assist/extended_zodiac";
import Image from "next/image";
import { notFound } from "next/navigation";
import ColorManager from "@/components/ColorManager/ColorManager";
import Link from "next/link";

export default function SwayPage({ params }: { params: { color: string } }) {
  var gottenSignColor = SignColor[params.color];
  if (gottenSignColor == null) return notFound();
  return (
    <>
      <ColorManager mainColor={gottenSignColor.color} />
      <Box title={gottenSignColor.name} primary>
        <div className="paragraph">
          <img
            width={96}
            height={96}
            src={`/assets/signs/${gottenSignColor.name}/${gottenSignColor.sign}.svg`}
            alt={gottenSignColor.name}
          ></img>
          <p>{gottenSignColor.description}</p>
        </div>
        <Link href={`/hiveswap/truesign/${gottenSignColor.sign}`}>
          Go To True Sign
        </Link>
      </Box>
    </>
  );
}
