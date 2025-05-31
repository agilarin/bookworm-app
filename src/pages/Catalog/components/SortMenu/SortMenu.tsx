import { useState } from "react";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import * as S from "./SortMenu.styles.ts";
import { useSearchParams } from "react-router";
import { BOOK_SORT_ARRAY } from "@/constants/bookSort.ts";

export function SortMenu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortValue, setSortValue] = useState(
    searchParams.get("sort") || BOOK_SORT_ARRAY[0].value
  );

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setSortValue(event.target.value as string);
    searchParams.set("sort", event.target.value as string);
    setSearchParams(searchParams);
  };

  return (
    <S.Select
      variant="standard"
      value={sortValue}
      onChange={handleChange}
      autoWidth
    >
      {BOOK_SORT_ARRAY.map(({ name, value }) => (
        <MenuItem
          key={value}
          value={value}
        >
          {name}
        </MenuItem>
      ))}
    </S.Select>
  );
}
