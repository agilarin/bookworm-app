import Stack from "@mui/material/Stack";
import { CategoryItem } from "./components/CategoryItem";
import { GenreMenuType } from "@/types";
import { useCategoryState } from "./useCategoryState";

export interface CategoryProps {
  genreMenus: GenreMenuType[];
  slug?: string;
}

export function Category({ genreMenus, slug }: CategoryProps) {
  const { parent, current, list } = useCategoryState(genreMenus, slug);

  return (
    <Stack gap={0.25}>
      <CategoryItem
        value="Все книги"
        href="/catalog"
        back={!!slug}
        active={!slug}
      />

      {parent && (
        <CategoryItem
          value={parent.name}
          href={`/catalog/${parent.id}`}
          back
        />
      )}

      {current && (
        <CategoryItem
          value={current.name}
          href={`/catalog/${current.id}`}
          active={current.id === slug}
          nestingLevel={1}
        />
      )}

      {list?.map(({ name, id }) => (
        <CategoryItem
          key={id}
          value={name}
          href={`/catalog/${id}`}
          nestingLevel={current ? 2 : 1}
        />
      ))}
    </Stack>
  );
}
