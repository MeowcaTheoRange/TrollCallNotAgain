import * as yup from "yup";
import { ColorSchema, ObjectIdSchema, PolicySchema } from "./assist/generics";
import { ClientFlairSchema } from "./flair";

// can't "submit" users
// this is false, now you can

export const SubmitUserSchema = yup.object({
  name: yup.string().required().min(3).max(50),
  description: yup.string().max(10000).ensure(),
  url: yup.string().notRequired().url(),
  color: yup
    .tuple([
      yup.number().required().min(0).max(255),
      yup.number().required().min(0).max(255),
      yup.number().required().min(0).max(255),
    ])
    .required(),
  // flairs: yup.array().of(ClientFlairSchema).required(),
});

export type SubmitUser = yup.InferType<typeof SubmitUserSchema>;

export const ServerUserSchema = SubmitUserSchema.shape({
  _id: ObjectIdSchema.required(),
  flairs: yup.array().of(ObjectIdSchema).required(),
  code: ObjectIdSchema.required(),
});

export type ServerUser = yup.InferType<typeof ServerUserSchema>;

export const ClientUserSchema = SubmitUserSchema.shape({
  color: ColorSchema.required(),
  flairs: yup.array().of(ClientFlairSchema).required(),
});

export type ClientUser = yup.InferType<typeof ClientUserSchema>;
