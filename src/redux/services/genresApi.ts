import { firestore } from "@/config/firebase";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  getDocFromCache,
  getDocsFromCache,
} from "firebase/firestore";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { GenreType } from "@/types";
import { store } from "../store";

async function cacheErrorHandler<T>(
  promise: Promise<T>
): Promise<T | undefined> {
  try {
    return await promise;
  } catch {
    return;
  }
}

const genresRef = collection(firestore, "/genres");
const genresListRef = collection(firestore, "/genresList");

export const genresApi = createApi({
  reducerPath: "genresApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    getGenreById: build.query<GenreType, string>({
      queryFn: async (id) => {
        const genreDoc = doc(genresRef, id);
        try {
          let genreSnap = await cacheErrorHandler(getDocFromCache(genreDoc));
          if (!genreSnap?.exists()) {
            genreSnap = await getDoc(genreDoc);
          }
          return {
            data: { ...genreSnap.data(), id: genreSnap.id } as GenreType,
          };
        } catch (error) {
          console.error(error);
          return { error: error };
        }
      },
    }),

    getGenresList: build.query<GenreType[], void>({
      queryFn: async () => {
        try {
          let genresListSnap = await cacheErrorHandler(
            getDocsFromCache(genresListRef)
          );
          if (!genresListSnap || genresListSnap?.empty) {
            genresListSnap = await getDocs(genresListRef);
          }
          const genresList = genresListSnap.docs?.[0]?.data();

          const result: GenreType[] = await Promise.all(
            genresList.genres?.map(async (genreId: string) => {
              const promise = store.dispatch(
                genresApi.endpoints.getGenreById.initiate(genreId)
              );
              const { data } = await promise;
              return data;
            })
          );

          return {
            data: result,
          };
        } catch (error) {
          console.error(error);
          return { error: error };
        }
      },
    }),
  }),
});

export const { useGetGenreByIdQuery, useGetGenresListQuery } = genresApi;
