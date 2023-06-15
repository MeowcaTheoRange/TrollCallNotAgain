import { ColorSchema } from "@/types/assist/color";
import * as yup from "yup";
import { ClassNameList, TrueSignList } from "../assist/extended_zodiac";
import { PolicySchema } from "../assist/generics";
import { SubmitQuirkHolderSchema } from "../quirks";

export const SubmitTrollSchema = yup
  .object({
    // Name and identification
    name: yup
      .tuple([
        yup
          .string()
          .required()
          .matches(/^[A-z]+$/, "Letters only")
          .length(6)
          .lowercase(),
        yup
          .string()
          .required()
          .matches(/^[A-z]+$/, "Letters only")
          .length(6)
          .lowercase(),
      ])
      .required(),
    description: yup.string().max(10000).ensure(),
    pronunciation: yup
      .tuple([
        yup
          .string()
          .required()
          .matches(/^[A-z-]+$/, "Letters only")
          .lowercase(),
        yup
          .string()
          .required()
          .matches(/^[A-z-]+$/, "Letters only")
          .lowercase(),
      ])
      .required(),
    pronouns: yup
      .array()
      .of(
        yup
          .tuple([
            yup
              .string()
              .required()
              .matches(/^[A-z]+$/, "Letters only")
              .min(1)
              .max(10)
              .lowercase(), // she, he, they
            yup
              .string()
              .required()
              .matches(/^[A-z]+$/, "Letters only")
              .min(1)
              .max(10)
              .lowercase(), // her, him, them
            yup
              .string()
              .required()
              .matches(/^[A-z]+$/, "Letters only")
              .min(1)
              .max(10)
              .lowercase(), // hers, his, theirs
          ])
          .required()
      )
      .required()
      .min(1),
    gender: yup
      .string()
      .required()
      .matches(/^[A-z-_]+$/, "Letters only")
      .min(3)
      .max(30),

    // Personal
    preferences: yup
      .object({
        love: yup
          .array()
          .of(yup.string().required().min(5).max(100))
          .required()
          .min(3)
          .max(10),
        hate: yup
          .array()
          .of(yup.string().required().min(5).max(100))
          .required()
          .min(3)
          .max(10),
      })
      .required(),
    facts: yup
      .array()
      .of(yup.string().required().min(5).max(100))
      .required()
      .min(3)
      .max(10),

    // Hiveswap identity
    trueSign: yup.string().required().oneOf(TrueSignList),
    falseSign: yup
      .string()
      .nullable()
      .transform((v) => {
        return v === "" ? null : v;
      })
      .oneOf(TrueSignList), // "Keelez Bunbat"
    class: yup.string().required().oneOf(ClassNameList),

    // Trollian
    username: yup
      .string()
      .required()
      .matches(
        /^(([a-z])[a-z]+)(([A-Z])[a-z]+)$/,
        "Username must match Pesterchum formatting."
      ),
    textColor: ColorSchema.notRequired(), // default to trueSign color if undefined,
    quirks: SubmitQuirkHolderSchema.required(), // DO NOT HANDLE RIGHT NOW.
    // Handled! :D

    // Physical stuff
    species: yup
      .string()
      .notRequired()
      .matches(/^([A-z-]+)|()$/, "Letters only"), // "Troll-*" if defined. Otherwise, just "Troll".
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
    // owners: yup.array().of(yup.string().required()).required().min(1),
    // flairs: yup.array().of(yup.mixed()).required().ensure(),
  })
  .required();

export type SubmitTroll = yup.InferType<typeof SubmitTrollSchema>;
