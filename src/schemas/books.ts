import { z } from "zod/v4";
import { genreSchema } from "./genres";

export const tagSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const publisherSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const authorSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const bookImagesSchema = z.record(
  z.string(),
  z.object({
    webp: z.string(),
    jpeg: z.string(),
  })
);

export const bookSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  ratingValue: z.number().optional(),
  ratingCount: z.number().optional(),
  pages: z.number(),
  ageRating: z.string(),
  isbn: z.string().optional(),
  translator: z.string().optional(),
  publisher: publisherSchema.optional(),
  dateTranslate: z.number().optional(),
  dateCreate: z.number().optional(),
  images: bookImagesSchema,
  genres: z.array(genreSchema),
  tags: z.array(tagSchema),
  authors: z.array(authorSchema),
  genreIds: z.array(z.string()),
  tagIds: z.array(z.string()),
  authorIds: z.array(z.string()),
});
