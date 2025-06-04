import { useParams } from "react-router";
import {
  Container,
  Grid,
  Typography,
  useMediaQuery,
  Box,
  Stack,
} from "@mui/material";
import { BookContent } from "@/pages/Book/components/BookContent";
import { ImagePicture } from "@/components/ImagePicture";
import * as S from "./Book.styles.ts";
import { RatingInfo } from "./components/RatingInfo/RatingInfo.tsx";
import { useGetBookQuery } from "@/redux/services/bookApi.ts";
import { FullPageLoader } from "@/components/FullPageLoader/FullPageLoader.tsx";

export function Book() {
  const isDownMD = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const { bookId } = useParams();
  const { data: book, isLoading } = useGetBookQuery(bookId || "");
  const authorsNames = book?.authors.map((item) => item.name).join(" ,");
  const title = [
    book?.title,
    authorsNames && `(${authorsNames})`,
    "- BookWorm",
  ].join(" ");

  if (isLoading || !book) {
    return (
      <>
        <FullPageLoader />
      </>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <Container
      disableGutters={isDownMD}
      sx={{ my: 3 }}
    >
      <title>{title}</title>

      <Grid
        container
        gap={{ md: 3 }}
      >
        <Grid
          size={{ xs: 12, md: "auto" }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
        >
          <ImagePicture
            images={book.images}
            covers={["cover_200", "cover_330"]}
            defaultCover="cover_200"
            imageEl={(img) => (
              <S.ImagePreview
                src={img}
                alt={book?.title}
              />
            )}
          />

          {isDownMD && (
            <Stack
              direction="column"
              alignItems="center"
              gap={1}
              mb={1}
            >
              <Box>
                <Typography
                  color="textSecondary"
                  textAlign="center"
                  component="div"
                >
                  {book?.authors.map((author) => author.name).join(", ")}
                </Typography>
                <Typography
                  component="h1"
                  variant="h5"
                  textAlign="center"
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
              <Typography
                component="div"
                variant="h5"
                fontSize={28}
                fontWeight={500}
                color="primary"
              >
                {book?.price} ₽
              </Typography>
            </Stack>
          )}

          {/* <Button
            variant="contained"
            disableElevation
            onClick={handleClick}
            sx={(theme) => ({
              minWidth: "220px",
              [theme.breakpoints.up("md")]: { width: "100%" },
            })}
          >
            Добавить в карзину
          </Button> */}
        </Grid>

        <Grid size={{ xs: 12, md: "grow" }}>
          <BookContent book={book} />
        </Grid>
      </Grid>
    </Container>
  );
}
