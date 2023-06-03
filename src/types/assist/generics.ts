import * as yup from "yup";
import { ObjectId } from "mongodb";
import { Color3, ColorTypes } from "./color";

export const ObjectIdSchema = yup.mixed((value): value is ObjectId =>
  ObjectId.isValid(value)
);

export const PolicySchema = yup
  .string()
  .oneOf(["yes", "ask", "no"])
  .default("no");
