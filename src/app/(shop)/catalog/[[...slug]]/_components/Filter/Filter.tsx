import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { Category, CategoryProps } from "../Category";
import { FilterItem } from "../FilterItem";
import { FilterSelect, FilterSelectItem } from "../FilterSelect";
import { PublisherType } from "@/types";

interface FilterProps extends CategoryProps {
  ageRatings: string[];
  publishers: PublisherType[];
}

export function Filter({
  genresList,
  slug,
  ageRatings,
  publishers,
}: FilterProps) {
  return (
    <Paper elevation={0}>
      <Stack
        padding={1.5}
        gap={1.5}
      >
        <FilterItem title="Жанры">
          <Category
            slug={slug}
            genresList={genresList}
          />
        </FilterItem>

        <FilterItem title="Издательства">
          <FilterSelect
            items={publishers.map(({ id, name }) => (
              <FilterSelectItem
                key={id}
                title={name}
                searchParamsName="publishers"
                searchParamsValue={id}
              />
            ))}
          />
        </FilterItem>

        <FilterItem title="Возрастное ограничение">
          <FilterSelect
            items={ageRatings.map((item) => (
              <FilterSelectItem
                key={item}
                title={item}
                searchParamsName="ageRatings"
                searchParamsValue={item}
              />
            ))}
          />
        </FilterItem>
      </Stack>
    </Paper>
  );
}
