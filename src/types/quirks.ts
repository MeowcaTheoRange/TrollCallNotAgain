import * as yup from "yup";

// See FlaringK's Quirk Builder for type info.
// https://flaringk.github.io/quirkbuilder/
// https://discord.com/channels/294616636726444033/1067996841532215337/1111282886038016130

export const QuirkSchema = yup
  .object({
    quirk: yup
      .array()
      .of(
        yup
          .object({
            type: yup
              .string()
              .required()
              .oneOf([
                "prefix",
                "suffix",
                "simple",
                "regex",
                "case",
                "case_simple",
                "case_regex",
              ]),
            find: yup.string().notRequired(),
            replace: yup.array().of(yup.string().required()).required(),
            condition: yup.string().notRequired(),
          })
          .required()
      )
      .required(),
  })
  .required();

export type Quirk = yup.InferType<typeof QuirkSchema>;

export const SubmitQuirkHolderSchema = yup
  .array()
  .of(yup.tuple([yup.string().required(), QuirkSchema.required()]).required())
  .required()
  .test("has-default", 'Array does not contain tuple with "default" key', (v) =>
    v.some(([k, v]) => k === "default")
  );

export type SubmitQuirkHolder = yup.InferType<typeof SubmitQuirkHolderSchema>;

export const ServerQuirkHolderSchema = yup.mixed(); // cant do SHIT in yup

export type ServerQuirkHolder = { [key: string]: Quirk };
