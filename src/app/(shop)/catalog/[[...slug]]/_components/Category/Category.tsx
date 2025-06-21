import { Stack } from "@mui/material";
import { CategoryItem } from "./components/CategoryItem";
import { GenreType } from "@/types";

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

export interface CategoryProps {
  genresList: GenreType[];
  slug?: string;
}

export function Category({ genresList, slug }: CategoryProps) {
  const { parentGenre, currentGenre, genreList } = getGenres(
    genresList || [],
    slug
  );

  return (
    <Stack gap={0.25}>
      <CategoryItem
        value="Все книги"
        href="/catalog"
        back={!!slug}
        active={!slug}
      />

      {parentGenre && (
        <CategoryItem
          value={parentGenre.name}
          href={`/catalog/${parentGenre.id}`}
          back
        />
      )}

      {currentGenre && (
        <CategoryItem
          value={currentGenre.name}
          href={`/catalog/${currentGenre.id}`}
          active={currentGenre.id === slug}
          nestingLevel={1}
        />
      )}

      {genreList?.map(({ name, id }) => (
        <CategoryItem
          key={id}
          value={name}
          href={`/catalog/${id}`}
          nestingLevel={parentGenre ? 2 : 1}
        />
      ))}
    </Stack>
  );
}
