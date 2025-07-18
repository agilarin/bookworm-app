import { bookSchema } from "@/schemas/books";
import { generateFirestoreParsers } from "./generateFirestoreParsers";

export const {
  parseDoc: parseBookFromDoc,
  parseSnapshot: parseBooksFromSnapshot,
} = generateFirestoreParsers("Book", bookSchema);
