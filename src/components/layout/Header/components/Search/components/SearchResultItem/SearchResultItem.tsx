"use client";

import Link from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BookType } from "@/types";
import { OptimizedImage } from "@/components/OptimizedImage";

interface SearchResultItemProps {
  book: BookType;
  onClick?: () => void;
}

export function SearchResultItem({ book, onClick }: SearchResultItemProps) {
  const authors = book.authors.map((item) => item.name).join(" ,");

  return (
    <Stack
      component={Link}
      href={`/book/${book.id}`}
      onClick={onClick}
      direction="row"
      alignItems="center"
      padding={1}
      gap={1.5}
      borderRadius={1}
      sx={{ ":hover": { bgcolor: "grey.200" } }}
    >
      <OptimizedImage
        images={book.images}
        covers={[100, 100]}
        defaultCover={100}
        alt={book.title}
        imgComponent={(props) => (
          <Box
            component="img"
            {...props}
            borderRadius={0.5}
            minWidth={52}
            width={52}
            minHeight={75}
            bgcolor="grey.300"
            sx={{ objectFit: "cover", aspectRatio: "2 / 3" }}
          />
        )}
      />

      <Stack minHeight={44}>
        <Typography
          fontSize={14}
          marginBottom={0.5}
          color="textPrimary"
        >
          {book.title}
        </Typography>
        <Typography
          fontSize={13}
          color="textSecondary"
        >
          {authors}
        </Typography>
      </Stack>
    </Stack>
  );
}
