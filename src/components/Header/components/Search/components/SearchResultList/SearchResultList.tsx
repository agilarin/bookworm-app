"use client";

import { useQuery } from "@tanstack/react-query";
import { Stack, CircularProgress, Typography } from "@mui/material";
import { searchBooks } from "./searchBooks.action";
import { SearchSuggestsContainer } from "../SearchSuggestsContainer";
import { SearchResultItem } from "../SearchResultItem";

interface SearchResultListProps {
  searchTerm: string;
  onClose: () => void;
}

export function SearchResultList({
  searchTerm,
  onClose,
}: SearchResultListProps) {
  const { data: books, isLoading } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => searchBooks(searchTerm),
    enabled: Boolean(searchTerm),
  });

  if (!searchTerm) {
    return null;
  }

  if (isLoading) {
    return (
      <SearchSuggestsContainer>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          flex={1}
          height={100}
        >
          <CircularProgress size={32} />
        </Stack>
      </SearchSuggestsContainer>
    );
  }

  if (!books?.length) {
    return (
      <SearchSuggestsContainer>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          flex={1}
          height={100}
        >
          <Typography
            fontSize={16}
            color="textSecondary"
          >
            Ничего не найдено
          </Typography>
        </Stack>
      </SearchSuggestsContainer>
    );
  }

  return (
    <SearchSuggestsContainer>
      <Stack
        overflow="auto"
        padding={1}
        flex={1}
      >
        {books?.map((book) => (
          <SearchResultItem
            key={book.id}
            book={book}
            onClick={onClose}
          />
        ))}
      </Stack>
    </SearchSuggestsContainer>
  );
}
