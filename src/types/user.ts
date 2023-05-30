import * as yup from "yup";
import { ColorSchema, ObjectIdSchema, PolicySchema } from "./assist/generics";
import { ClientFlairSchema } from "./flair";

// can't "submit" users

export const ClientUserSchema = yup.object({
  name: yup.string().required().min(3).max(50),
  description: yup.string().max(10000).ensure(),
  url: yup.string().notRequired().url(),
  color: ColorSchema.required(),
  flairs: yup.array().of(ClientFlairSchema).required(),
});

export type ClientUser = yup.InferType<typeof ClientUserSchema>;

// basing the server off of the client will be much easier
//       se

export const UnverifiedUserSchema = yup.object({
  _id: ObjectIdSchema.required(),
  full: yup.boolean().default(false),
  email: yup.string().notRequired(),
  emailVerified: yup.string().notRequired(),
});

export type UnverifiedUser = yup.InferType<typeof UnverifiedUserSchema>;

export const ServerUserSchema = ClientUserSchema.shape({
  _id: ObjectIdSchema.required(),
  email: yup.string().notRequired(),
  emailVerified: yup.string().notRequired(),
  flairs: yup.array().of(ObjectIdSchema).required(),
});

export type ServerUser = yup.InferType<typeof ServerUserSchema>;
