import { bookReviewSchema } from "@/schemas/bookReviews";
import { generateFirestoreParsers } from "./generateFirestoreParsers";

export const {
  parseDoc: parseBookReviewFromDoc,
  parseSnapshot: parseBookReviewsFromSnapshot,
} = generateFirestoreParsers("Book review", bookReviewSchema);
