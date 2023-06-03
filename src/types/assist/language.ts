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
