import * as yup from "yup";
import { ColorSchema } from "./assist/color";
import { TrueSignList, TrueSignSchema } from "./assist/extended_zodiac";
import { ObjectIdSchema } from "./assist/mongo";
import { ClientFlairSchema } from "./flair";

export const SubmitUserSchema = yup.object({
  name: yup.string().required().min(3).max(50),
  description: yup.string().max(10000).ensure(),
  url: yup.string().notRequired().url(),
  trueSign: yup.string().required().oneOf(TrueSignList),
  color: ColorSchema.required(),
  // flairs: yup.array().of(ClientFlairSchema).required(),
});

export type SubmitUser = yup.InferType<typeof SubmitUserSchema>;

export const ServerUserSchema = SubmitUserSchema.shape({
  _id: ObjectIdSchema.required(),
  flairs: yup.array().of(ObjectIdSchema.required()).required(),
  code: yup.string().required(),
});

export type ServerUser = yup.InferType<typeof ServerUserSchema>;

export const ClientUserSchema = SubmitUserSchema.shape({
  flairs: yup.array().of(ClientFlairSchema.required()).required(),
  trueSign: TrueSignSchema.required(),
});

export type ClientUser = yup.InferType<typeof ClientUserSchema>;
