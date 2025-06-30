"use client";

import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Backdrop from "@mui/material/Backdrop";
import Stack from "@mui/material/Stack";
import { useDebounce } from "@/hooks/useDebounce";
import { SearchResultList } from "./components/SearchResultList";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import * as S from "./Search.styles";

export function Search() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleClose = () => setOpen(false);

  return (
    <Stack
      maxWidth={{ md: "480px" }}
      width={1}
    >
      <Backdrop
        open={open}
        onClick={handleClose}
      />
      <Stack
        position="relative"
        direction="column"
        zIndex={1}
      >
        <S.InputWrapper open={open}>
          <S.SearchInput
            fullWidth
            type="text"
            placeholder="Поиск..."
            value={searchTerm}
            onClick={() => setOpen(true)}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Stack direction="row">
            {searchTerm && (
              <S.SearchButton
                color="inherit"
                onClick={() => setSearchTerm("")}
              >
                <CloseRoundedIcon
                  sx={(theme) => ({
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                  })}
                />
              </S.SearchButton>
            )}
            <S.SearchButton color="inherit">
              <SearchIcon sx={{ color: "grey.700" }} />
            </S.SearchButton>
          </Stack>
        </S.InputWrapper>

        {open && (
          <SearchResultList
            searchTerm={debouncedSearchTerm}
            onClose={handleClose}
          />
        )}
      </Stack>
    </Stack>
  );
}
