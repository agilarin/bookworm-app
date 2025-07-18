import {
  collection,
  query,
  orderBy,
  limit as queryLimit,
  startAfter,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
  getCountFromServer,
} from "firebase/firestore";

import { firestore } from "@/lib/firebase";
import { BookReviewType } from "@/types";
import { BOOKS_COLLECTION, BOOKS_REVIEWS_COLLECTION } from "@/constants";
import { parseBookReviewsFromSnapshot } from "@/utils/parsers/bookReviewParsers";

const booksRef = collection(firestore, BOOKS_COLLECTION);

export type CursorType = QueryDocumentSnapshot<DocumentData> | null;

interface GetBookReviewsParams {
  bookId: string;
  limit?: number;
  cursor?: CursorType;
}

export interface GetBookReviewsResponse {
  count: number;
  reviews: BookReviewType[];
  nextCursor: CursorType;
}

export async function getBookReviews({
  bookId,
  limit = 10,
  cursor = null,
}: GetBookReviewsParams): Promise<GetBookReviewsResponse> {
  try {
    const bookReviewsRef = collection(
      booksRef,
      bookId,
      BOOKS_REVIEWS_COLLECTION
    );

    let reviewsQuery = query(
      bookReviewsRef,
      orderBy("createdAt", "desc"),
      queryLimit(limit)
    );

    if (cursor) {
      reviewsQuery = query(
        bookReviewsRef,
        orderBy("createdAt", "desc"),
        startAfter(cursor),
        queryLimit(limit)
      );
    }

    const reviewsCountSnap = await getCountFromServer(bookReviewsRef);
    const reviewsCount = reviewsCountSnap.data().count;

    const reviewsSnap = await getDocs(reviewsQuery);

    const lastVisibleDoc =
      reviewsSnap.docs[reviewsSnap.docs.length - 1] || null;

    return {
      count: reviewsCount,
      reviews: parseBookReviewsFromSnapshot(reviewsSnap),
      nextCursor: lastVisibleDoc,
    };
  } catch (error) {
    console.error("Error fetching book reviews:", error);
    throw error;
  }
}
