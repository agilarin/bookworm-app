import { firestore } from "@/config/firebase";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  where,
  limit,
  documentId,
  orderBy,
  QueryConstraint,
  startAfter,
  limitToLast,
  getCountFromServer,
  DocumentSnapshot,
  endBefore,
} from "firebase/firestore";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { BooksSortFieldValues, BookType } from "@/types";
import { BOOK_SORT_QUERY_MAP } from "@/constants";

const booksRef = collection(firestore, "/books");

interface GetBooksType {
  genresId?: string[];
  sort?: BooksSortFieldValues;
  nextPage?: DocumentSnapshot;
  prevPage?: DocumentSnapshot;
}

type GetBooksResponse = {
  count: number;
  books: BookType[];
  docs: DocumentSnapshot[];
};

const LIMIT = 30;

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    getBook: build.query<BookType, string>({
      queryFn: async (id) => {
        try {
          const bookSnap = await getDoc(doc(booksRef, id));
          return { data: { ...bookSnap.data(), id: bookSnap.id } as BookType };
        } catch (error) {
          console.error(error);
          return { error: error };
        }
      },
    }),

    getBooks: build.mutation<GetBooksResponse, GetBooksType | void>({
      queryFn: async (data) => {
        const constraints: QueryConstraint[] = [];
        if (data?.genresId) {
          constraints.push(
            where("genresId", "array-contains-any", data?.genresId)
          );
        }
        if (data?.sort) {
          constraints.push(orderBy(...BOOK_SORT_QUERY_MAP[data.sort]));
        }

        try {
          const booksCountSnap = await getCountFromServer(
            query(booksRef, ...constraints)
          );
          const { count } = booksCountSnap.data();
          if (data?.nextPage) {
            constraints.push(startAfter(data.nextPage), limit(LIMIT));
          } else if (data?.prevPage) {
            constraints.push(endBefore(data.nextPage), limitToLast(LIMIT));
          } else {
            constraints.push(limit(LIMIT));
          }

          const booksSnap = await getDocs(query(booksRef, ...constraints));
          const books: BookType[] = [];
          booksSnap.forEach((snap) => {
            books.push({ ...snap.data(), id: snap.id } as BookType);
          });

          return { data: { count, books, docs: booksSnap.docs } };
        } catch (error) {
          console.error(error);
          return { error: error };
        }
      },
    }),

    getBooksByIds: build.query<BookType[], string[]>({
      queryFn: async (idArray) => {
        try {
          const booksQuery = query(
            booksRef,
            where(documentId(), "in", idArray)
          );

          const booksSnap = await getDocs(booksQuery);
          const books: BookType[] = [];
          booksSnap.forEach((snap) => {
            books.push({ ...snap.data(), id: snap.id } as BookType);
          });
          return { data: books };
        } catch (error) {
          console.error(error);
          return { error: error };
        }
      },
    }),

    searchBooksByName: build.mutation<BookType[], string>({
      queryFn: async (searchTerm) => {
        searchTerm = searchTerm.toLowerCase();
        const strlength = searchTerm.length;
        const strFrontCode = searchTerm.slice(0, strlength - 1);
        const strEndCode = searchTerm.slice(strlength - 1, searchTerm.length);
        const endCode =
          strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
        try {
          const booksQuery = query(
            booksRef,
            where("title", ">=", searchTerm),
            where("title", "<=", endCode),
            limit(10)
          );
          const booksSnap = await getDocs(booksQuery);
          const books: BookType[] = [];
          booksSnap.forEach((snap) => {
            books.push({ ...snap.data(), id: snap.id } as BookType);
          });
          return { data: books };
        } catch (error) {
          console.error(error);
          return { error: error };
        }
      },
    }),
  }),
});

export const {
  useGetBookQuery,
  // useGetBooksByGenresIdMutation,
  useGetBooksMutation,
  useGetBooksByIdsQuery,
  useSearchBooksByNameMutation,
} = bookApi;
