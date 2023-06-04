import * as yup from "yup";
import { ColorSchema } from "./assist/color";
import { ObjectIdSchema } from "./assist/generics";

export const SubmitFlairSchema = yup
  .object({
    name: yup.string().required().min(10).max(50),
    alt: yup.string().max(1000),

    color: ColorSchema.required(),
    link: yup.string().notRequired().url(),
  })
  .required();

export type SubmitFlair = yup.InferType<typeof SubmitFlairSchema>;

export const ServerFlairSchema = SubmitFlairSchema.shape({
  // Ownership
  _id: ObjectIdSchema.required(),
});

export type ServerFlair = yup.InferType<typeof ServerFlairSchema>;

export const ClientFlairSchema = SubmitFlairSchema.shape({});

export type ClientFlair = yup.InferType<typeof ClientFlairSchema>;
