import { genreSchema, genreMenuSchema } from "@/schemas/genres";
import { generateFirestoreParsers } from "./generateFirestoreParsers";

export const { parseDoc: parseGenreFromDoc } = generateFirestoreParsers(
  "Genre",
  genreSchema
);

export const {
  parseDoc: parseGenreMenuFromDoc,
  parseSnapshot: parseGenreMenusFromSnapshot,
} = generateFirestoreParsers("GenreMenu", genreMenuSchema);
