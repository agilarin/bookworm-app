import z from "zod/v4";
import {
  authorSchema,
  bookImagesSchema,
  bookSchema,
  publisherSchema,
  tagSchema,
} from "@/schemas/books";
import {
  bookReviewSchema,
  createBookReviewSchema,
} from "@/schemas/bookReviews";
import { genreMenuSchema, genreSchema } from "@/schemas/genres";

export type GenreType = z.infer<typeof genreSchema>;

export type TagType = z.infer<typeof tagSchema>;

export type PublisherType = z.infer<typeof publisherSchema>;

export type AuthorType = z.infer<typeof authorSchema>;

export type CoverSize = 415 | 330 | 200 | 100;

export type BookImagesType = z.infer<typeof bookImagesSchema>;

// export type BookType = {
//   id: string;
//   title: string;
//   description: string;
//   price: number;
//   ratingValue?: number;
//   ratingCount?: number;
//   pages: number;
//   ageRating: string;
//   isbn?: string;
//   translator?: string;
//   publisher?: PublisherType;
//   dateTranslate?: number;
//   dateCreate?: number;
//   images: BookImagesType;
//   genres: GenreType[];
//   tags: TagType[];
//   authors: AuthorType[];
//   genreIds: string[];
//   tagIds: string[];
//   authorIds: string[];
// };

export type BookType = z.infer<typeof bookSchema>;

export type BooksSortFieldValues =
  | "popularDesc"
  | "ratingDesc"
  | "priceAsc"
  | "priceDesc";

export type BookReviewType = z.infer<typeof bookReviewSchema>;

export type CreateBookReviewParams = z.infer<typeof createBookReviewSchema>;

export type GenreMenuType = z.infer<typeof genreMenuSchema>;
