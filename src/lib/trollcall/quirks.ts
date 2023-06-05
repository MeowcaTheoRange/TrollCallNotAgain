import { ArraySample } from "@/types/assist/language";
import { Quirk } from "@/types/quirks";

export function parseQuirk(string: string, quirk: Quirk) {
  var mutatingString = string;
  quirk.quirk.forEach((quirkFunction) => {
    var replaceValue = ArraySample(quirkFunction.replace);
    if (
      quirkFunction.condition &&
      !mutatingString.match(new RegExp(quirkFunction.condition, "g"))
    )
      return;
    switch (quirkFunction.type) {
      case "prefix": {
        mutatingString = replaceValue + mutatingString;
        break;
      }
      case "suffix": {
        mutatingString = mutatingString + replaceValue;
        break;
      }
      case "simple": {
        if (quirkFunction.find == undefined) break;
        mutatingString = mutatingString.replaceAll(
          quirkFunction.find,
          replaceValue
        );
        break;
      }
      case "regex": {
        if (quirkFunction.find == undefined) break;
        mutatingString = mutatingString.replace(
          new RegExp(quirkFunction.find, "g"),
          replaceValue
        );
        break;
      }
      case "case": {
        mutatingString =
          replaceValue === "lower"
            ? mutatingString.toLowerCase()
            : mutatingString.toUpperCase();
        break;
      }
      case "case_simple": {
        if (quirkFunction.find == undefined) break;
        mutatingString = mutatingString.replaceAll(quirkFunction.find, (m) =>
          replaceValue === "lower" ? m.toLowerCase() : m.toUpperCase()
        );
        break;
      }
      case "case_regex": {
        if (quirkFunction.find == undefined) break;
        mutatingString = mutatingString.replace(
          new RegExp(quirkFunction.find, "g"),
          (m) => (replaceValue === "lower" ? m.toLowerCase() : m.toUpperCase())
        );
        break;
      }
    }
  });
  return mutatingString;
}
