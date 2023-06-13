import { ArraySample } from "@/types/assist/language";
import { Quirk } from "@/types/quirks";

export function parseQuirk(string: string, quirk: Quirk) {
  var mutatingString = string;
  quirk.quirk.forEach((quirkFunction) => {
    var conditionRegex;
    if (quirkFunction.condition) {
      try {
        conditionRegex = new RegExp(quirkFunction.condition, "g");
      } catch (e) {
        conditionRegex = null;
        return;
      }
    }
    var replaceValue = ArraySample(quirkFunction.replace);
    if (conditionRegex && !mutatingString.match(conditionRegex)) return;
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
        var testRegex;
        try {
          testRegex = new RegExp(quirkFunction.find, "g");
        } catch (e) {
          break;
        }
        mutatingString = mutatingString.replace(testRegex, replaceValue);
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
      case "case_pos": {
        // morbidJester
        if (quirkFunction.find == undefined) break;
        const [ca, sp, cs, ow] = quirkFunction.find.split(", ");
        if (ca == null || sp == null) break;
        var characterAmount: number = +ca;
        var startPos: string = sp;
        var characterSep: number = +(cs ?? 0);
        var oneword: boolean = ow === "true";
        var brokenSentence = oneword
          ? [mutatingString]
          : mutatingString.split(" ");
        mutatingString = brokenSentence
          .map((word) => {
            var leftNC, rightNC;
            let newStr = word
              .replace(
                /^([^a-zA-Z]*)(.*?)([^a-zA-Z]*)$/g,
                (match, left, center, right, _, __) => {
                  leftNC = left;
                  rightNC = right;
                  return center;
                }
              )
              .split("");
            for (
              let i = 0;
              i < characterAmount * (characterSep + 1);
              i += characterSep + 1
            ) {
              if (i >= newStr.length) break;
              var trueIndex = startPos === "end" ? newStr.length - (i + 1) : i;
              newStr[trueIndex] =
                replaceValue === "lower"
                  ? newStr[trueIndex].toLowerCase()
                  : newStr[trueIndex].toUpperCase();
            }
            return leftNC + newStr.join("") + rightNC;
          })
          .join(" ");

        break;
      }
      case "case_regex": {
        if (quirkFunction.find == undefined) break;
        var testRegex;
        try {
          testRegex = new RegExp(quirkFunction.find, "g");
        } catch (e) {
          break;
        }
        mutatingString = mutatingString.replace(testRegex, (m) =>
          replaceValue === "lower" ? m.toLowerCase() : m.toUpperCase()
        );
        break;
      }
    }
  });
  return mutatingString;
}
