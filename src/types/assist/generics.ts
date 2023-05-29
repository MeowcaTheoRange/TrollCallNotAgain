import * as yup from "yup";
import { ObjectId } from "mongodb";
import { Color3, ColorTypes } from "./color";

export const ObjectIdSchema = yup.mixed((value): value is ObjectId =>
  ObjectId.isValid(value)
);

export const ColorSchema = yup
  .mixed((value): value is ColorTypes => Color3.isColor(value))
  .transform((v, i, c) => (c.isType(v) ? v : Color3.assumeColor(v, true)));

export const PolicySchema = yup
  .string()
  .oneOf(["yes", "ask", "no"])
  .default("no");
