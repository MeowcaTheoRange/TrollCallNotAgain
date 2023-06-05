import * as yup from "yup";

export const PolicySchema = yup
  .string()
  .oneOf(["yes", "ask", "no"])
  .default("no");
