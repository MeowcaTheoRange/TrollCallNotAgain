"use client";

import Box from "@/components/Box/Box";
import Flexbox from "@/components/Flexbox/Flexbox";
import SignBadge from "@/components/SignBadge/SignBadge";
import "@/styles/form.css";
import {
  AspectList,
  SignColorList,
  SwayList,
  TrueSign,
  TrueSignList,
} from "@/types/assist/extended_zodiac";
import { useState } from "react";

export default function TrueSigns() {
  var [selectedAspect, setSelectedAspect] = useState("");
  var [selectedColor, setSelectedColor] = useState("");
  var [selectedSway, setSelectedSway] = useState("");
  return (
    <Box title={"True Signs"} primary>
      <p>Signs sorted by color, then sway, then aspect.</p>
      <div className="FieldHolder">
        <select onChange={(e) => setSelectedColor(e.target.value)}>
          <option value={""} label="All colors" />
          {SignColorList.map((color, i) => (
            <option key={i} value={color.name} label={color.name} />
          ))}
        </select>
      </div>
      <div className="FieldHolder">
        <select onChange={(e) => setSelectedSway(e.target.value)}>
          <option value={""} label="Either sway" />
          {SwayList.map((sway, i) => (
            <option key={i} value={sway.name} label={sway.name} />
          ))}
        </select>
      </div>
      <div className="FieldHolder">
        <select onChange={(e) => setSelectedAspect(e.target.value)}>
          <option value={""} label="All aspects" />
          {AspectList.map((aspect, i) => (
            <option key={i} value={aspect.name} label={aspect.name} />
          ))}
        </select>
      </div>
      <hr />
      <Flexbox gap="16px" wrap justify="space-around">
        {TrueSignList.map((signName, i) =>
          TrueSign[signName].aspect.name.includes(selectedAspect) &&
          TrueSign[signName].color.name.includes(selectedColor) &&
          TrueSign[signName].sway.name.includes(selectedSway) ? (
            <SignBadge key={i} trueSign={TrueSign[signName]} />
          ) : (
            <></>
          )
        )}
      </Flexbox>
    </Box>
  );
}
