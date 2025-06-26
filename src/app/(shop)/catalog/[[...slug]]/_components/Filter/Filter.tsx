import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { Category, CategoryProps } from "../Category";
import { FilterItem } from "../FilterItem";
import { FilterSelect, FilterSelectItem } from "../FilterSelect";
import { TagType } from "@/types";

interface FilterProps extends CategoryProps {
  tags: TagType[];
}

export function Filter({ genresList, slug, tags }: FilterProps) {
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

        <FilterItem title="Тэги">
          <FilterSelect
            items={tags.map(({ id, name }) => (
              <FilterSelectItem
                key={id}
                title={name}
                searchParamsName="tags"
                searchParamsValue={id}
              />
            ))}
          />
        </FilterItem>
      </Stack>
    </Paper>
  );
}
