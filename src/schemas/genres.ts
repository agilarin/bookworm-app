import z from "zod/v4";

export const genreSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const genreMenuSchema = z.object({
  id: z.string(),
  name: z.string(),
  genres: z.array(genreSchema),
  genreIds: z.array(z.string()),
});
