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
              .oneOf([
                "prefix",
                "suffix",
                "simple",
                "regex",
                "case",
                "case_simple",
                "case_regex",
              ])
              .required(),
            find: yup.string().notRequired(),
            replace: yup.array().of(yup.string().required()).required().min(1),
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
  .test("has-default", 'Needs "default" Quirk Mode', (v) =>
    v.some(([k, v]) => k === "default")
  );

export type SubmitQuirkHolder = yup.InferType<typeof SubmitQuirkHolderSchema>;

export const ServerQuirkHolderSchema = yup.mixed(); // cant do SHIT in yup

export type ServerQuirkHolder = { [key: string]: Quirk };

export const QuirkReplacementTypes: {
  [key: string]: { find: string | null; replace: string };
} = {
  prefix: {
    find: null,
    replace: "The text that precedes the main text.",
  },
  suffix: {
    find: null,
    replace: "The text that proceeds the main text.",
  },
  simple: {
    find: "Text to find what you want to replace.",
    replace: "The text that replaces the found text.",
  },
  regex: {
    find: "A Regular Expresion to find what you want to replace.",
    replace: "A replacement expression that replaces the found text.",
  },
  case: {
    find: "Change the case of all text.",
    replace: '"lower" for lowercase. "upper" for uppercase.',
  },
  case_simple: {
    find: "Text to find what you want to change the case of.",
    replace: '"lower" for lowercase. "upper" for uppercase.',
  },
  case_regex: {
    find: "A Regular Expresion to find what you want to change the case of.",
    replace: '"lower" for lowercase. "upper" for uppercase.',
  },
};
