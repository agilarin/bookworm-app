"use server";

import { firestoreAdmin } from "../firebaseAdmin";
import { BookType, BooksSortFieldValues } from "@/types";
import {
  BOOK_SORT_QUERY_MAP,
  BOOKS_COLLECTION,
  LIMIT,
  SEARCH_LIMIT,
  BOOK_ITEM_TAG,
  BOOKS_TAG,
  getBookTagById,
  getBooksTagByGenreId,
} from "@/constants";
import {
  parseBookFromDoc,
  parseBooksFromSnapshot,
} from "@/utils/parsers/bookParsers";
import { normalizeToArray } from "@/utils/normalizeToArray";
import { customCache } from "@/utils/customCache";

interface GetBooksParams {
  genreIds?: string | string[];
  ageRatings?: string | string[];
  publisherIds?: string | string[];
  sort?: BooksSortFieldValues;
  page?: number | string;
  limit?: number;
}
type GetBooksResponse = {
  count: number;
  pages: number;
  books: BookType[];
};

const booksRef = firestoreAdmin.collection(BOOKS_COLLECTION);

export const getBooks = customCache(
  async (data?: GetBooksParams): Promise<GetBooksResponse> => {
    const {
      limit = LIMIT,
      page = 1,
      sort = "popularDesc",
      genreIds,
      publisherIds,
      ageRatings,
    } = data || {};

    const genres = normalizeToArray(genreIds);
    const publishers = normalizeToArray(publisherIds);
    const ratings = normalizeToArray(ageRatings);

    try {
      let booksQuery = booksRef.orderBy(...BOOK_SORT_QUERY_MAP[sort]);

      if (genres?.length) {
        booksQuery = booksQuery.where("genreIds", "array-contains-any", genres);
      }

      if (publishers?.length) {
        booksQuery = booksQuery.where("publisher.id", "in", publishers);
      }

      if (ratings?.length) {
        booksQuery = booksQuery.where("ageRating", "in", ratings);
      }

      const booksCountSnap = await booksQuery.count().get();
      const count = booksCountSnap.data().count;

      const booksSnap = await booksQuery
        .limit(limit)
        .offset((Number(page) - 1) * limit)
        .get();

      return {
        count: count,
        pages: Math.ceil(count / limit),
        books: parseBooksFromSnapshot(booksSnap),
      };
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  },
  undefined,
  {
    tags: (data) => [
      BOOKS_TAG,
      ...(normalizeToArray(data?.genreIds)?.map((id) =>
        getBooksTagByGenreId(id)
      ) || []),
    ],
    revalidate: false,
  }
);

export const getBookById = customCache(
  async (id: string): Promise<BookType | null> => {
    try {
      const bookSnap = await booksRef.doc(id).get();

      if (!bookSnap.exists) {
        return null;
      }

      return parseBookFromDoc(bookSnap);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  undefined,
  {
    tags: (id) => [getBookTagById(id), BOOK_ITEM_TAG],
    revalidate: false,
  }
);

export async function getBooksById(bookIds: string[]): Promise<BookType[]> {
  try {
    const books = await Promise.all(bookIds.map((id) => getBookById(id)));
    return books.filter(Boolean) as BookType[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function searchBooksByName(
  searchTerm: string
): Promise<BookType[]> {
  searchTerm = searchTerm.trim();

  const lastChar = searchTerm.slice(-1);
  const frontPart = searchTerm.slice(0, -1);
  const nextChar = String.fromCharCode(lastChar.charCodeAt(0) + 1);
  const endCode = frontPart + nextChar;

  try {
    const booksSnap = await booksRef
      .where("title", ">=", searchTerm)
      .where("title", "<=", endCode)
      .limit(SEARCH_LIMIT)
      .get();

    return parseBooksFromSnapshot(booksSnap);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
