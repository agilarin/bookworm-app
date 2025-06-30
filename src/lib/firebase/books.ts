import { firestoreAdmin } from "./firebaseAdmin";
import { unstable_cache } from "next/cache";
import {
  CollectionReference,
  FieldPath,
  Query,
} from "firebase-admin/firestore";
import {
  BookFilterType,
  BookType,
  BooksSortFieldValues,
  PublisherType,
} from "@/types";
import { BOOK_SORT_QUERY_MAP, LIMIT, SEARCH_LIMIT } from "@/constants";
import { extractBooksFromQuerySnapshot } from "@/utils/extractBooksFromQuerySnapshot";
import slugify from "@sindresorhus/slugify";

interface GetBooksType {
  genresId?: string | string[];
  ageRatings?: string | string[];
  publishersId?: string | string[];
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
  async (data?: GetBooksType): Promise<GetBooksResponse> => {
    const limit = data?.limit || LIMIT;
    const page = Number(data?.page) || 1;
    const sort = data?.sort || "popularDesc";
    const genresId = data?.genresId && Array<string>(0).concat(data?.genresId);
    const publishersId =
      data?.publishersId && Array<string>(0).concat(data?.publishersId);
    const ageRatings =
      data?.ageRatings && Array<string>(0).concat(data?.ageRatings);

    try {
      let booksQuery = booksRef.orderBy(...BOOK_SORT_QUERY_MAP[sort]);
      if (genresId && genresId.length) {
        booksQuery = booksQuery.where(
          "genresId",
          "array-contains-any",
          genresId
        );
      }
      if (publishersId && publishersId.length) {
        booksQuery = booksQuery.where("publisher.id", "in", publishersId);
      }
      if (ageRatings && ageRatings.length) {
        booksQuery = booksQuery.where("ageRating", "in", ageRatings);
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

type BookFilterNames = keyof Pick<BookType, "ageRating" | "publisher">;

interface GetBooksFilterType<N> {
  name: N;
  genresId?: string | string[];
  ageRatings?: string | string[];
  publishersId?: string | string[];
}
// : N extends "ageRating" ? string : PublisherType[]
export const getBooksFilter = unstable_cache(
  async <N extends BookFilterNames>(
    data: GetBooksFilterType<N>
  ): Promise<N extends "ageRating" ? string[] : PublisherType[]> => {
    const name = data.name;
    const genresId = data?.genresId && Array<string>(0).concat(data?.genresId);
    const ageRatings =
      data?.ageRatings && Array<string>(0).concat(data?.ageRatings);
    const publishersId =
      data?.publishersId && Array<string>(0).concat(data?.publishersId);

    try {
      let filtersQuery: CollectionReference | Query = booksRef;
      if (genresId && genresId.length) {
        filtersQuery = filtersQuery.where(
          "genresId",
          "array-contains-any",
          genresId
        );
      }
      if (name !== "ageRating" && ageRatings && ageRatings.length) {
        filtersQuery = filtersQuery?.where("ageRating", "in", ageRatings);
      }
      if (name !== "publisher" && publishersId && publishersId.length) {
        filtersQuery = filtersQuery?.where("publisher.id", "in", publishersId);
      }

      const filterSnap = await filtersQuery.select(name).get();

      const filterMap: { [k: string]: unknown } = {};

      filterSnap.docs.forEach((snap) => {
        const data = snap.data();
        const filterValue = data[name];
        if (filterValue) {
          filterMap[JSON.stringify(data)] = filterValue;
        }
      });

      return Object.values(filterMap) as any;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  ["getBooksFilters"]
);
