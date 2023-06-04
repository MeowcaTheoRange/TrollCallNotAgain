import * as yup from "yup";
import { ObjectIdSchema, PolicySchema } from "./assist/generics";
import {
  ClassList,
  ClassNameList,
  ClassSchema,
  TrueSignList,
  TrueSignSchema,
} from "./assist/extended_zodiac";
import { ClientFlairSchema } from "./flair";
import { ClientUserSchema } from "./user";
import { ColorSchema } from "./assist/color";

export const SubmitTrollSchema = yup
  .object({
    // Name and identification
    name: yup
      .tuple([
        yup.string().required().length(6),
        yup.string().required().length(6),
      ])
      .required(),
    description: yup.string().max(10000).ensure(),
    pronunciation: yup
      .tuple([
        yup.string().required().lowercase(),
        yup.string().required().lowercase(),
      ])
      .required(),
    pronouns: yup
      .array()
      .of(
        yup
          .tuple([
            yup.string().required().min(1).max(10), // she, he, they
            yup.string().required().min(1).max(10), // her, him, them
            yup.string().required().min(1).max(10), // hers, his, theirs
          ])
          .required()
      )
      .required()
      .min(1),
    gender: yup.string().required().min(3).max(30),

    // Personal
    preferences: yup
      .object({
        love: yup
          .array()
          .of(yup.string().required().min(10).max(100))
          .required()
          .min(3)
          .max(10),
        hate: yup
          .array()
          .of(yup.string().required().min(10).max(100))
          .required()
          .min(3)
          .max(10),
      })
      .required(),
    facts: yup
      .array()
      .of(yup.string().required().min(10).max(100))
      .required()
      .min(3)
      .max(10),

    // Hiveswap identity
    trueSign: yup.string().required().oneOf(TrueSignList),
    falseSign: yup.string().notRequired().oneOf(TrueSignList), // "Keelez Bunbat"
    class: yup.string().required().oneOf(ClassNameList),

    // Trollian
    username: yup
      .string()
      .required()
      .matches(/^(([a-z])[a-z]+)(([A-Z])[a-z]+)$/),
    textColor: ColorSchema.notRequired(), // default to trueSign color if undefined,
    quirks: yup.object().required(), // DO NOT HANDLE RIGHT NOW.

    /* Quirk Builder JSON
{
  "Default": {
    "color": "#000000",
    "handle": "",
    "quirk": [
      {
        "type": "prefix",
        "prefix": "["
      },
      {
        "type": "suffix",
        "suffix": "]"
      },
      {
        "type": "simple",
        "find": " ",
        "replace": "]~["
      }
    ]
  },
  "mpewfmnkp;ewfmk;ewf": {
    "handle": "AC",
    "color": "#416600",
    "quirk": [
      {
        "type": "prefix",
        "prefix": ":33 < "
      },
      {
        "type": "prefix",
        "prefix": "X33 < ",
        "condition": "!"
      },
      {
        "type": "simple",
        "find": "ee",
        "replace": "33",
        "condition": "awnaw"
      },
      {
        "type": "suffix",
        "suffix": "wefnkewjnklewnklewf",
        "condition": "???"
      },
      {
        "type": "simple",
        "find": "ee",
        "replace": "wewg",
        "condition": "???"
      },
      {
        "type": "regex",
        "regex": "balls",
        "replace": "among us",
        "condition": "sussy"
      },
      {
        "type": "random",
        "regex": "two bit",
        "replaces": [
          "stupid"
        ],
        "condition": "idiot"
      }
    ]
  }
}
  */

    // Physical stuff
    species: yup.string().notRequired(), // "Troll-*" if defined. Otherwise, just "Troll".
    height: yup.number().required().positive(), // Inches
    age: yup.number().required().positive(), // Sweeps
    image: yup.string().required().url(),
    // Meta stuff
    policies: yup
      .object({
        fanart: PolicySchema.required(),
        fanartOthers: PolicySchema.required(),
        kinning: PolicySchema.required(),
        shipping: PolicySchema.required(),
        fanfiction: PolicySchema.required(),
      })
      .required(),
    owners: yup.array().of(yup.string().required()).required().min(1),
    flairs: yup.array().of(yup.string().required()).ensure(),
  })
  .required();

export type SubmitTroll = yup.InferType<typeof SubmitTrollSchema>;

export const ServerTrollSchema = SubmitTrollSchema.shape({
  // Ownership
  _id: ObjectIdSchema.required(),
  owners: yup.array().of(ObjectIdSchema.required()).required().min(1),
  flairs: yup.array().of(ObjectIdSchema.required()).required(),
});

export type ServerTroll = yup.InferType<typeof ServerTrollSchema>;

export const ClientTrollSchema = SubmitTrollSchema.shape({
  owners: yup.array().of(ClientUserSchema.required()).required().min(1),
  flairs: yup.array().of(ClientFlairSchema.required()).required(),
  trueSign: TrueSignSchema.required(),
  falseSign: TrueSignSchema.notRequired(),
  class: ClassSchema.required(),
});

export type ClientTroll = yup.InferType<typeof ClientTrollSchema>;
