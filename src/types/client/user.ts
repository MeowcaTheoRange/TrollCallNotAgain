import * as yup from "yup";
import { ColorSchema } from "../assist/color";
import { TrueSignList } from "../assist/extended_zodiac";

export const SubmitUserSchema = yup
  .object({
    name: yup
      .string()
      .required()
      .matches(/^[\w-]+$/, "No special characters or spaces")
      .min(3)
      .max(50)
      .lowercase(),
    description: yup.string().max(10000).ensure(),
    url: yup.string().notRequired().url(),
    trueSign: yup.string().required().oneOf(TrueSignList),
    color: ColorSchema.required(),
    code: yup
      .string()
      .notRequired()
      .min(6, "Be a little more secure, please. (min 6 characters)")
      .max(256, "Too secure!!"),
    // flairs: yup.array().of(ClientFlairSchema).required(),
  })
  .required();

export type SubmitUser = yup.InferType<typeof SubmitUserSchema>;
