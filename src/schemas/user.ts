import z from "zod/v4";
import { timestampSchema } from "./firebase";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema.optional(),
});
