"use server";

import { firestoreAdmin } from "../firebaseAdmin";
import { unstable_cache } from "next/cache";
import { GenreMenuType, GenreType } from "@/types";
import { customCache } from "@/utils/customCache";
import {
  GENRE_ITEM_TAG,
  GENRE_MENU_ITEM_TAG,
  GENRE_MENUS_COLLECTION,
  GENRE_MENUS_TAG,
  GENRES_COLLECTION,
  getGenreMenuTagById,
  getGenreTagById,
} from "@/constants";
import { parseGenreFromDoc } from "@/utils/parsers/genreParsers";
import { genreMenuSchema } from "@/schemas/genres";

const genresRef = firestoreAdmin.collection(GENRES_COLLECTION);
const genreMenusRef = firestoreAdmin.collection(GENRE_MENUS_COLLECTION);

export const getGenreById = customCache(
  async (id: string): Promise<GenreType | null> => {
    try {
      const genreSnap = await genresRef.doc(id).get();

      if (!genreSnap.exists) {
        return null;
      }

      return parseGenreFromDoc(genreSnap);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  undefined,
  {
    tags: (id) => [getGenreTagById(id), GENRE_ITEM_TAG],
    revalidate: false,
  }
);

export const getGenreMenus = unstable_cache(
  async (): Promise<GenreMenuType[]> => {
    try {
      const genreMenusSnap = await genreMenusRef.get();

      const genreMenusPromises = genreMenusSnap.docs.map(async (doc) => {
        const data = doc.data();

        const genres: GenreType[] = await Promise.all(
          data.genreIds.map(getGenreById) || []
        );

        return { id: doc.id, genres, ...data } as GenreMenuType;
      });

      const genreMenus = await Promise.all(genreMenusPromises || []);
      return genreMenus.filter(Boolean);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  undefined,
  {
    tags: [GENRE_MENUS_TAG],
    revalidate: false,
  }
);

export const getGenreMenuById = customCache(
  async (id: string): Promise<GenreMenuType | null> => {
    try {
      const genreMenusSnap = await genreMenusRef.doc(id).get();

      const genres: GenreType[] = await Promise.all(
        genreMenusSnap.data()?.genreIds.map(getGenreById) || []
      );

      const result = genreMenuSchema.safeParse({
        id: genreMenusSnap.id,
        ...genreMenusSnap.data(),
        genres,
      });

      if (!result.success) {
        console.error(`GenreMenu validation failed`, result.error, {
          id: genreMenusSnap.id,
          ...genreMenusSnap.data(),
          genres,
        });
        return null;
      }
      return result.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  undefined,
  {
    tags: (id) => [getGenreMenuTagById(id), GENRE_MENU_ITEM_TAG],
    revalidate: false,
  }
);
