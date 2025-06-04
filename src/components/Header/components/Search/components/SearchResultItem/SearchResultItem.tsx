import { generatePath, Link } from "react-router";
import { Stack, Typography, Box } from "@mui/material";
import { BookType } from "@/types";
import { ROUTES_PATHS } from "@/constants";
import { ImagePicture } from "@/components/ImagePicture";

interface SearchResultItemProps {
  book: BookType;
  onClick?: () => void;
}

export function SearchResultItem({ book, onClick }: SearchResultItemProps) {
  return (
    <Stack
      component={Link}
      to={generatePath(ROUTES_PATHS.BOOK, { bookId: book.id })}
      onClick={onClick}
      direction="row"
      alignItems="center"
      padding={1}
      gap={1.5}
      borderRadius={1}
      sx={{ ":hover": { bgcolor: "grey.200" } }}
    >
      <ImagePicture
        images={book.images}
        defaultCover="cover_100"
        imageEl={(img) => (
          <Box
            component="img"
            src={img}
            alt={book.title}
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
          {book.authors.map((item) => item.name).join(" ,")}
        </Typography>
      </Stack>
    </Stack>
  );
}
