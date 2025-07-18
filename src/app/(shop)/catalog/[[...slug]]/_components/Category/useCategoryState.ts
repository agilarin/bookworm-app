import { useMemo } from "react";
import { GenreMenuType, GenreType } from "@/types";

type CategoryState = {
  parent: GenreMenuType | undefined;
  current: GenreMenuType | GenreType | undefined;
  list: GenreMenuType[] | GenreType[] | undefined;
};

export function useCategoryState(
  genreMenus: GenreMenuType[],
  slug?: string
): CategoryState {
  const state = useMemo(() => {
    if (!slug) return { list: genreMenus };

    for (const genreMenu of genreMenus) {
      if (genreMenu.id === slug) {
        return {
          current: genreMenu,
          list: genreMenu.genres,
        };
      }

      for (const genre of genreMenu.genres) {
        if (genre.id === slug) {
          return {
            parent: genreMenu,
            current: genre,
          };
        }
      }
    }

    return { list: genreMenus };
  }, [genreMenus, slug]);

  return {
    parent: undefined,
    current: undefined,
    list: undefined,
    ...state,
  };
}
