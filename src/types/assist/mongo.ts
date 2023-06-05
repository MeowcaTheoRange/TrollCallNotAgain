import { ObjectId } from "mongodb";
import * as yup from "yup";

export const ObjectIdSchema = yup.mixed((value): value is ObjectId =>
  ObjectId.isValid(value)
);
