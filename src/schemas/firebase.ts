import { z } from "zod/v4";
import { Timestamp } from "firebase/firestore";

export const timestampSchema = z
  .custom<Timestamp>((val) => {
    if (val instanceof Timestamp) {
      return val.toDate();
    }
    throw new Error("Expected Timestamp");
  })
  .transform((val) => val.toDate());

export const timestampReadSchema = z
  .custom<Timestamp>((val) => {
    if (val instanceof Timestamp) {
      return val.toDate();
    }
    throw new Error("Expected Timestamp");
  })
  .transform((val) => val.toDate());

export const timestampWriteSchema = z
  .custom<Timestamp>((val) => {
    if (val instanceof Date) {
      return Timestamp.fromDate(val);
    }
    throw new Error("Expected Date");
  })
  .transform((val) => val.toDate());
// export const timestampSchema = {
//   parse: (val: unknown): Date => {
//     if (val instanceof Timestamp) return val.toDate();
//     throw new Error("Expected Timestamp");
//   },
//   serialize: (val: Date): Timestamp => {
//     if (val instanceof Date) return Timestamp.fromDate(val);
//     throw new Error("Expected Date");
//   },
// };
