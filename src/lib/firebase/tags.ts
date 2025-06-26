import { firestoreAdmin } from "./firebaseAdmin";
import { unstable_cache } from "next/cache";
import { BookType, TagType } from "@/types";

interface getBooksTagsType {
  genresId?: string | string[];
}

const booksRef = firestoreAdmin.collection("books");

export const getBooksTags = unstable_cache(
  async (data?: getBooksTagsType) => {
    const genresId = data?.genresId && Array<string>(0).concat(data?.genresId);

    try {
      let booksQuery;
      if (genresId && genresId.length) {
        booksQuery = booksRef.where("genresId", "array-contains-any", genresId);
      } else {
        booksQuery = booksRef;
      }

      const booksSnap = await booksQuery.select("tags").get();

      const tagsMap: { [key: string]: TagType } = {};
      booksSnap.docs.forEach((doc) => {
        const { tags } = doc.data() as Pick<BookType, "tags">;
        tags.forEach((tag) => {
          tagsMap[tag.id] = tag;
        });
      });

      return Object.values(tagsMap);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  ["getBooksTags"],
  {
    revalidate: false,
  }
);
