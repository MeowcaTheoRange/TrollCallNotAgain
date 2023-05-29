export type ColorTypes = [number, number, number] | string | number;
export class Color3 {
  R: number;
  G: number;
  B: number;
  constructor(red: number, green: number, blue: number) {
    this.R = red;
    this.G = green;
    this.B = blue;
  }
  static fromRGB(red: number, green: number, blue: number) {
    return new Color3(red / 255, green / 255, blue / 255);
  }
  static fromHex(hex: string) {
    // @ts-ignore
    const hexSplit: [number, number, number] = (
      hex.match(new RegExp(`[0-9a-f]{1,${hex.length / 3}}`, "gi")) ?? [
        "0",
        "0",
        "0",
      ]
    ).map((x) => parseInt(x, 16) / 255);
    return new Color3(...hexSplit);
  }
  static fromInt(int: number) {
    return new Color3(
      (int & 0xff0000) >> 16,
      (int & 0x00ff00) >> 8,
      int & 0x0000ff
    );
  }
  static assumeColor(
    value: [number, number, number] | string | number,
    rgb?: boolean
  ) {
    if (Color3.isColor(value)) {
      if (Array.isArray(value))
        return rgb ? Color3.fromRGB(...value) : new Color3(...value);
      else if (typeof value === "string") return Color3.fromHex(value);
      else if (typeof value === "number") return Color3.fromInt(value);
    }
    return "Not a valid color type";
  }
  static isColor(
    value: [number, number, number] | string | number,
    rgb?: boolean
  ) {
    return (
      (Array.isArray(value) &&
        value.length === 3 &&
        value.every((x) => typeof x === "number" && !isNaN(x))) ||
      (typeof value === "string" && !isNaN(parseInt(value, 16))) ||
      (typeof value === "number" && !isNaN(value))
    );
  }

  toHex() {
    return this.toInt().toString(16).padStart(6, "0");
  }
  toInt() {
    return (this.R << 16) + (this.G << 8) + this.B;
  }
  toRGB() {
    return [this.R * 255, this.G * 255, this.B * 255];
  }
}
