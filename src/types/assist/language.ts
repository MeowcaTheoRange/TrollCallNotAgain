export function AdaptivePossessive(owner: string, possession: string) {
  return owner + (owner.endsWith("s") ? "'" : "'s") + " " + possession;
}
