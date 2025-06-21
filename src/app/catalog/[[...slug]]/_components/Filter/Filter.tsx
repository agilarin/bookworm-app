import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { Category, CategoryProps } from "../Category";
import { FilterItem } from "../FilterItem";

type FilterProps = CategoryProps;

export function Filter({ genresList, slug }: FilterProps) {
  return (
    <Paper elevation={0}>
      <Stack padding={1.5}>
        <FilterItem title="Жанры">
          <Category
            slug={slug}
            genresList={genresList}
          />
        </FilterItem>
      </Stack>
    </Paper>
  );
}
