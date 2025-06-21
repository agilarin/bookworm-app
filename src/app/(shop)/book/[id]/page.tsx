import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { GenerateMetadataProps } from "@/types";
import { getBookById } from "@/lib/firebase/books";
import { ImagePicture } from "@/components/ImagePicture";
import { MediaQuery } from "@/components/MediaQuery";
import { RatingInfo } from "./_components/RatingInfo";
import { BookContent } from "./_components/BookContent";
import * as S from "./Book.styles";
import { notFound } from "next/navigation";

type BookParams = Promise<{ id: string }>;

interface BookProps {
  params: BookParams;
}

export async function generateMetadata({
  params,
}: GenerateMetadataProps<BookParams>) {
  const { id } = await params;
  const book = await getBookById(id);
  if (!book) {
    notFound();
  }

  const authorsNames = book?.authors.map((item) => item.name).join(" ,");

  const title = [
    book?.title,
    authorsNames && `(${authorsNames})`,
    "- BookWorm",
  ].join(" ");

  return { title: title };
}

export default async function Book({ params }: BookProps) {
  const { id } = await params;
  const book = await getBookById(id);
  if (!book) {
    notFound();
  }
  const authors = book?.authors.map((author) => author.name).join(", ");

  return (
    <Container
      // disableGutters={isDownMD}
      sx={{ my: 3 }}
    >
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

          <MediaQuery maxWidth="md">
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
                  {authors}
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
          </MediaQuery>
        </Grid>

        <Grid size={{ xs: 12, md: "grow" }}>
          <BookContent book={book} />
        </Grid>
      </Grid>
    </Container>
  );
}
