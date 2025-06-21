import { firestoreAdmin } from "./firebaseAdmin";
import { unstable_cache } from "next/cache";
import { FieldPath, QuerySnapshot } from "firebase-admin/firestore";
import { BookType, BooksSortFieldValues } from "@/types";
import { BOOK_SORT_QUERY_MAP, LIMIT, SEARCH_LIMIT } from "@/constants";

interface GetBooksType {
  genresId?: string[];
  sort?: BooksSortFieldValues;
  page?: number;
  limit?: number;
}
type GetBooksResponse = {
  count: number;
  pages: number;
  books: BookType[];
};

const booksRef = firestoreAdmin.collection("books");

function extractBooksFromQuerySnap(querySnap: QuerySnapshot) {
  return querySnap.docs.map(
    (snap) =>
      ({
        id: snap.id,
        ...snap.data(),
      } as BookType)
  );
}

export const getBooks = unstable_cache(
  async (data: GetBooksType): Promise<GetBooksResponse> => {
    const limit = data?.limit || LIMIT;
    const page = data?.page || 1;
    const sort = data?.sort || "popularDesc";
    const genresId = data?.genresId;

    try {
      let booksQuery = booksRef.orderBy(...BOOK_SORT_QUERY_MAP[sort]);
      if (genresId) {
        booksQuery = booksQuery.where(
          "genresId",
          "array-contains-any",
          genresId
        );
      }

      const booksCountSnap = await booksQuery.count().get();
      const count = booksCountSnap.data().count;
      const booksSnap = await booksQuery
        .limit(limit)
        .offset((page - 1) * limit)
        .get();

      return {
        count: count,
        pages: Math.floor(count / limit),
        books: extractBooksFromQuerySnap(booksSnap),
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

      return extractBooksFromQuerySnap(booksSnap);
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

    return extractBooksFromQuerySnap(booksSnap);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
