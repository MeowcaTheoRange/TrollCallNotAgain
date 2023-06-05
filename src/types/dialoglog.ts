import * as yup from "yup";
import { ObjectIdSchema } from "./assist/generics";
import { ClientTroll, ClientTrollSchema } from "./troll";
import { ClientUserSchema } from "./user";

export const SubmitDialogSchema = yup.object({
  owners: yup.array().of(yup.string().required()).required().min(1),
  name: yup.string().required().min(3).max(100),
  description: yup.string().max(10000).ensure(),
  characters: yup
    .array()
    .of(
      yup
        .object({
          troll: yup.string().required(),
          time: yup.string().ensure(),
        })
        .required()
    )
    .required(),
  log: yup
    .array()
    .of(
      yup
        .object({
          character: yup.number().notRequired().min(0),
          quirk: yup.string().default("default"),
          text: yup.string().required().max(2000),
        })
        .required()
    )
    .required(),
});

export type SubmitDialog = yup.InferType<typeof SubmitDialogSchema>;

export const ServerDialogSchema = SubmitDialogSchema.shape({
  _id: ObjectIdSchema.required(),
  owners: yup.array().of(ObjectIdSchema.required()).required().min(1),
  characters: yup
    .array()
    .of(
      yup
        .object({
          troll: ObjectIdSchema.required(),
          time: yup.string().ensure(),
        })
        .required()
    )
    .required(),
});

export type ServerDialog = yup.InferType<typeof ServerDialogSchema>;

export const ClientDialogSchema = SubmitDialogSchema.shape({
  owners: yup.array().of(ClientUserSchema.required()).required().min(1),
  characters: yup
    .array()
    .of(
      yup
        .object({
          troll: ClientTrollSchema.required(),
          time: yup.string().ensure(),
        })
        .required()
    )
    .required(),
});

export interface ClientDialog extends yup.InferType<typeof ClientDialogSchema> {
  characters: {
    troll: ClientTroll;
    time: string;
  }[];
} // [SEARCH: HACK] a hack. thanks, jquense
