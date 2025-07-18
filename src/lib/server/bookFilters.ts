"use server";

import { CollectionReference, Query } from "firebase-admin/firestore";

import { BookType, PublisherType } from "@/types";
import { customCache } from "@/utils/customCache";
import { normalizeToArray } from "@/utils/normalizeToArray";
import {
  BOOKS_COLLECTION,
  BOOKS_FILTER_TAG,
  getBooksFilterTagByGenreId,
  getBooksFilterTagByName,
} from "@/constants";
import { firestoreAdmin } from "../firebaseAdmin";

const booksRef = firestoreAdmin.collection(BOOKS_COLLECTION);

type BookFilterNames = keyof Pick<BookType, "ageRating" | "publisher">;

interface GetBooksFilterParams<N> {
  name: N;
  genreIds?: string | string[];
  ageRatings?: string | string[];
  publisherIds?: string | string[];
}

type GetBooksFilterResponse<N> = N extends "ageRating" ? string : PublisherType;

export const getBooksFilter = customCache(
  async <N extends BookFilterNames>(
    data: GetBooksFilterParams<N>
  ): Promise<GetBooksFilterResponse<N>[]> => {
    const { name, genreIds, ageRatings, publisherIds } = data;

    const genres = normalizeToArray(genreIds);
    const ages = normalizeToArray(ageRatings);
    const publishers = normalizeToArray(publisherIds);

    let filtersQuery: CollectionReference | Query = booksRef;

    try {
      if (genres?.length) {
        filtersQuery = filtersQuery.where(
          "genreIds",
          "array-contains-any",
          genres
        );
      }

      if (name !== "ageRating" && ages?.length) {
        filtersQuery = filtersQuery.where("ageRating", "in", ages);
      }

      if (name !== "publisher" && publishers?.length) {
        filtersQuery = filtersQuery.where("publisher.id", "in", publishers);
      }

      const filterSnap = await filtersQuery.select(name).get();

      const filterMap: Record<string, GetBooksFilterResponse<N>> = {};

      filterSnap.docs.forEach((doc) => {
        const value = doc.data()[name];
        if (value) {
          filterMap[JSON.stringify(value)] = value;
        }
      });

      return Object.values(filterMap);
    } catch (error) {
      console.error("Error fetching books filter:", error);
      throw error;
    }
  },
  undefined,
  {
    tags: ({ name, genreIds }) => [
      getBooksFilterTagByName(name),
      BOOKS_FILTER_TAG,
      ...(normalizeToArray(genreIds)?.map((id) =>
        getBooksFilterTagByGenreId(id)
      ) || []),
    ],
    revalidate: false,
  }
);
