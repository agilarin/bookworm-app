import { firestoreAdmin } from "./firebaseAdmin";
import { unstable_cache } from "next/cache";
import { GenreType } from "@/types";

const genresRef = firestoreAdmin.collection("genres");
const genresListRef = firestoreAdmin.collection("genresList");

export const getGenreById = unstable_cache(
  async (id: string) => {
    try {
      const genreSnap = await genresRef.doc(id).get();

      if (!genreSnap.exists) {
        return;
      }

      return {
        ...genreSnap.data(),
        id: genreSnap.id,
      } as GenreType;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  ["getGenreById"],
  {
    tags: ["genre"],
    revalidate: false,
  }
);

export const getGenresList = unstable_cache(
  async () => {
    try {
      const genresListQuerySnap = await genresListRef.get();
      const genresListSnap = genresListQuerySnap.docs?.[0];

      if (!genresListSnap.exists) {
        return;
      }

      const result: GenreType[] = await Promise.all(
        genresListSnap.data().genres?.map(getGenreById)
      );

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  ["genresList"],
  {
    tags: ["genre", "genresList"],
    revalidate: false,
  }
);
