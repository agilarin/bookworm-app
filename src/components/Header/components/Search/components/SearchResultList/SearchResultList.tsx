import { useEffect, useRef } from "react";
import { Stack, CircularProgress, Typography } from "@mui/material";
import { useSearchBooksByNameMutation } from "@/redux/services/bookApi";
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
  const [searchBooksByName, { data: books, isLoading }] =
    useSearchBooksByNameMutation();
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (searchTerm) {
      searchBooksByName(searchTerm);
    }
  }, [searchBooksByName, searchTerm]);

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
