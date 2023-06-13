export function AdaptivePossessive(owner: string, possession: string) {
  return owner + (owner.endsWith("s") ? "'" : "'s") + " " + possession;
}

export function PronounGrouper(
  pronouns: [string, string, string],
  sep?: string,
  amount?: number
) {
  return pronouns.slice(0, amount ?? 2).join(sep ?? "/");
}

export function HeightConverter(inches: number) {
  var feetandinches = Math.floor(inches / 12) + "'" + (inches % 12) + '"';
  var meters = Math.floor((inches / 39.37) * 100) / 100 + "m";
  return feetandinches + " (" + meters + ")";
}

export function AgeConverter(sweeps: number, years?: boolean) {
  return years
    ? `${Math.round(sweeps * 2.1667 * 10) / 10} years`
    : `${sweeps} sweeps`;
}

export function Pluralize(stringe: string) {
  if (stringe.match(/(?:s|ch|sh|x|z|[^aeiou]o)$/)) return stringe + "es";
  else if (stringe.match(/[aeiou](?:y|o)$/)) return stringe + "s";
  else if (stringe.match(/[^aeiou]y$/)) return stringe.slice(0, -1) + "ies";
  else if (stringe.match(/(?:f|fe)$/)) return stringe.slice(0, -1) + "ves";
  else return stringe + "s";
}

export function ArraySample(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function ProperNounCase(string: string) {
  return string
    .split(" ")
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
    .join(" ");
}

export function PesterchumNameFormatter(string: string) {
  return (
    string +
    " [" +
    string.replace(/^(([a-z])[a-z]+)(([A-Z])[a-z]+)$/, "$2$4").toUpperCase() +
    "]"
  );
}
