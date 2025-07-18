import z from "zod/v4";
import { timestampSchema } from "./firebase";

export const bookReviewSchema = z.object({
  id: z.string(),
  userId: z.string(),
  username: z.string(),
  rating: z.number(),
  text: z.string(),
  createdAt: timestampSchema,
});

export const createBookReviewSchema = z.object({
  bookId: z.string(),
  userId: z.string(),
  username: z.string(),
  rating: z.number(),
  text: z.string(),
});
