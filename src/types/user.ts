import * as yup from "yup";
import { ColorSchema, ObjectIdSchema, PolicySchema } from "./assist/generics";
import { ClientFlairSchema } from "./flair";

export const SubmitUserSchema = yup
  .object({
    name: yup.string().required().min(3).max(50),
    description: yup.string().max(10000).ensure(),
    url: yup.string().notRequired().url(),
    color: ColorSchema.required(),
  })
  .required();

export type SubmitUser = yup.InferType<typeof SubmitUserSchema>;

export const ServerUserSchema = SubmitUserSchema.shape({
  _id: ObjectIdSchema.required(),
  flairs: yup.array().of(ObjectIdSchema).required(),
});

export type ServerUser = yup.InferType<typeof ServerUserSchema>;

export const ClientUserSchema = SubmitUserSchema.shape({
  flairs: yup.array().of(ClientFlairSchema).required(),
});

export type ClientUser = yup.InferType<typeof ClientUserSchema>;
