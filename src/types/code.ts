import * as yup from "yup";
import { ObjectIdSchema } from "./assist/generics";

// an alternative type of authentication, requiring a code to edit and create trolls, much like Rentry

export const ClientCodeSchema = yup.object({
  code: yup.string().required().min(8).max(100),
});

export type ClientCode = yup.InferType<typeof ClientCodeSchema>;

export const ServerCodeSchema = ClientCodeSchema.shape({
  _id: ObjectIdSchema.required(),
});

export type ServerCode = yup.InferType<typeof ServerCodeSchema>;
