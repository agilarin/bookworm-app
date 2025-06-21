"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import { BOOK_SORT_ARRAY } from "@/constants/bookSort";
import * as S from "./SortMenu.styles";

export function SortMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sortValue, setSortValue] = useState(
    searchParams.get("sort") || BOOK_SORT_ARRAY[0].value
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string;
    setSortValue(value);
    router.push(pathname + "?" + createQueryString("sort", value));
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
