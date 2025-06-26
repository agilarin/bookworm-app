import { firestoreAdmin } from "./firebaseAdmin";
import { unstable_cache } from "next/cache";
import { FieldPath } from "firebase-admin/firestore";
import { BookType, BooksSortFieldValues } from "@/types";
import { BOOK_SORT_QUERY_MAP, LIMIT, SEARCH_LIMIT } from "@/constants";
import { extractBooksFromQuerySnapshot } from "@/utils/extractBooksFromQuerySnapshot";

interface GetBooksType {
  genresId?: string | string[];
  tagsId?: string | string[];
  sort?: BooksSortFieldValues;
  page?: number | string;
  limit?: number;
}
type GetBooksResponse = {
  count: number;
  pages: number;
  books: BookType[];
};

const booksRef = firestoreAdmin.collection("books");

export const getBooks = unstable_cache(
  async (data: GetBooksType): Promise<GetBooksResponse> => {
    const limit = data?.limit || LIMIT;
    const page = Number(data?.page) || 1;
    const sort = data?.sort || "popularDesc";
    const genresId = data?.genresId && Array<string>(0).concat(data?.genresId);
    const tagsId = data?.tagsId && Array<string>(0).concat(data?.tagsId);

    try {
      let booksQuery = booksRef.orderBy(...BOOK_SORT_QUERY_MAP[sort]);
      if (genresId && genresId.length) {
        booksQuery = booksQuery.where(
          "genresId",
          "array-contains-any",
          genresId
        );
      }
      // if (tagsId && tagsId.length) {
      //   booksQuery = booksQuery.where("tagsId", "array-contains-any", tagsId);
      // }

      const booksCountSnap = await booksQuery.count().get();
      const count = booksCountSnap.data().count;
      const booksSnap = await booksQuery
        .limit(limit)
        .offset((page - 1) * limit)
        .get();

      return {
        count: count,
        pages: Math.floor(count / limit),
        books: extractBooksFromQuerySnapshot(booksSnap),
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  ["getBooks"],
  {
    tags: ["book", "books"],
    revalidate: false,
  }
);

export const getBookById = unstable_cache(
  async (id: string) => {
    try {
      const bookSnap = await booksRef.doc(id).get();

      if (!bookSnap.exists) {
        return;
      }

      return {
        id: bookSnap.id,
        ...bookSnap.data(),
      } as BookType;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  ["getBookById"],
  {
    tags: ["book"],
    revalidate: false,
  }
);

export const getBooksById = unstable_cache(
  async (idArray: string[]) => {
    try {
      const booksSnap = await booksRef
        .where(FieldPath.documentId(), "in", idArray)
        .get();

      return extractBooksFromQuerySnapshot(booksSnap);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  ["getBooksById"]
);

export async function searchBooksByName(searchTerm: string) {
  searchTerm = searchTerm.toLowerCase();
  const strlength = searchTerm.length;
  const strFrontCode = searchTerm.slice(0, strlength - 1);
  const strEndCode = searchTerm.slice(strlength - 1, searchTerm.length);
  const endCode =
    strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
  try {
    const booksSnap = await booksRef
      .where("title", ">=", searchTerm)
      .where("title", "<=", endCode)
      .limit(SEARCH_LIMIT)
      .get();

    return extractBooksFromQuerySnapshot(booksSnap);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
