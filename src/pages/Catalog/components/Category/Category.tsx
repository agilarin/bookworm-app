import { useMemo } from "react";
import { generatePath, useParams } from "react-router";
import { Stack } from "@mui/material";
import { ROUTES_PATHS } from "@/constants";
import { CategoryItem } from "./components/CategoryItem";
import { GenreType } from "@/types";
import { useGetGenresListQuery } from "@/redux/services/genresApi";

function getGenres(genres: GenreType[], genreSlug: string | undefined) {
  let parentGenre: GenreType | undefined;
  let genreList: GenreType[] | undefined = genres;

  const getCurrentGenre = (
    genres: GenreType[],
    genreSlug: string | undefined
  ): GenreType | undefined => {
    for (let i = 0; i < genres.length; i++) {
      const genre = genres[i];
      if (genre.id === genreSlug) {
        genreList = genre.genres;
        return genre;
      } else if (genre.genres) {
        const currentGenre = getCurrentGenre(genre.genres, genreSlug);
        if (currentGenre) {
          if (!parentGenre) {
            parentGenre = genre;
          }
          return currentGenre;
        }
      }
    }
  };
  const currentGenre = getCurrentGenre(genres, genreSlug);
  return {
    parentGenre,
    currentGenre,
    genreList,
  };
}

export function Category() {
  const { genreSlug } = useParams();
  const { data: genresList } = useGetGenresListQuery();

  const { parentGenre, currentGenre, genreList } = useMemo(
    () => getGenres(genresList || [], genreSlug),
    [genreSlug, genresList]
  );

  return (
    <Stack gap={0.25}>
      <CategoryItem
        value="Все книги"
        href={generatePath(ROUTES_PATHS.CATALOG)}
        back={!!genreSlug}
        active={!genreSlug}
      />

      {parentGenre && (
        <CategoryItem
          value={parentGenre.name}
          href={generatePath(ROUTES_PATHS.CATALOG, {
            genreSlug: parentGenre.id,
          })}
          back
        />
      )}

      {currentGenre && (
        <CategoryItem
          value={currentGenre.name}
          href={generatePath(ROUTES_PATHS.CATALOG, {
            genreSlug: currentGenre.id,
          })}
          active={currentGenre.id === genreSlug}
          nestingLevel={1}
        />
      )}

      {genreList?.map(({ name, id }) => (
        <CategoryItem
          key={id}
          value={name}
          href={generatePath(ROUTES_PATHS.CATALOG, { genreSlug: id })}
          nestingLevel={2}
        />
      ))}
    </Stack>
  );
}
