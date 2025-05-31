import { Paper, Stack } from "@mui/material";
import { Category } from "../Category";
import { FilterItem } from "../FilterItem";

export function Filter() {
  return (
    <Paper elevation={0}>
      <Stack padding={1.5}>
        <FilterItem title="Жанры">
          <Category />
        </FilterItem>
      </Stack>
    </Paper>
  );
}
