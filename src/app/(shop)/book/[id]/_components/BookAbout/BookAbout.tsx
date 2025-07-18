import { BookType } from "@/types";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { MediaQuery } from "@/components/MediaQuery";
import { RatingInfo } from "../RatingInfo";

interface BookAboutProps {
  book: BookType;
}

export function BookAbout({ book }: BookAboutProps) {
  const authors = book?.authors.map((author) => author.name).join(", ");

  return (
    <Stack
      direction={{ md: "row" }}
      justifyContent={{ md: "space-between" }}
      alignItems="center"
      gap={1}
    >
      <Box>
        <Typography
          color="textSecondary"
          textAlign={{ xs: "center", md: "left" }}
          component="div"
        >
          {authors}
        </Typography>
        <Typography
          component="h1"
          fontSize={{ xs: "24px", md: "34px" }}
          textAlign={{ xs: "center", md: "left" }}
          lineHeight={1.3}
          fontWeight={500}
        >
          {book?.title}
        </Typography>
      </Box>
      <Box marginTop={0.5}>
        <RatingInfo
          value={book.ratingValue}
          count={book.ratingCount}
        />
      </Box>
      <MediaQuery maxWidth="md">
        <Typography
          component="div"
          variant="h5"
          fontSize={28}
          fontWeight={500}
          color="primary"
        >
          {book?.price} ₽
        </Typography>
      </MediaQuery>
    </Stack>
  );
}
