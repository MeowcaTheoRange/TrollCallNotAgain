import * as yup from "yup";
import { TrueSignSchema } from "./assist/extended_zodiac";
import { ObjectIdSchema } from "./assist/mongo";
import { SubmitUserSchema } from "./client/user";
import { ClientFlairSchema } from "./flair";

export const ServerUserSchema = SubmitUserSchema.shape({
  _id: ObjectIdSchema.required(),
  flairs: yup.array().of(ObjectIdSchema.required()).required(),
  code: yup.string().required(),
  updatedDate: yup.date().notRequired(),
});

export type ServerUser = yup.InferType<typeof ServerUserSchema>;

export const ClientUserSchema = SubmitUserSchema.shape({
  flairs: yup.array().of(ClientFlairSchema.required()).required(),
  trueSign: TrueSignSchema.required(),
});

export type ClientUser = yup.InferType<typeof ClientUserSchema>;
