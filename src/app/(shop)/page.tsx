import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { getBooks, getBooksById } from "@/lib/firebase/books";
import { getGenresList } from "@/lib/firebase/genres";
import { SliderSection } from "@/components/SliderSection";
import { BookPreviewSliderSection } from "@/components/BookPreviewSliderSection";

const booksPreviewIds = [
  "RtyKqolIJxvyiytGcLi2",
  "LJkPx9KqDG6jWtghmGrM",
  "uKhA4Se9fABNKoyBIXgo",
  "gdkBDHoLGGTkR5Z1bfK8",
];

export default async function Home() {
  const GenreList = await getGenresList();
  const [booksPreview, popularBooks, ...genresBooks] = await Promise.all([
    getBooksById(booksPreviewIds),
    getBooks({ sort: "popularDesc", limit: 10 }),
    ...(GenreList || [])?.map((genre) => {
      return getBooks({
        genresId: genre.genresId,
        sort: "ratingDesc",
        limit: 10,
      });
    }),
  ]);

  return (
    <Container>
      <Stack
        paddingY={2}
        gap={{ xs: 1, md: 2.5 }}
      >
        <Paper elevation={0}>
          <BookPreviewSliderSection items={booksPreview} />
        </Paper>

        <Paper elevation={0}>
          <SliderSection
            title="Популярное"
            href={`/catalog?sort=popularDesc`}
            items={popularBooks.books}
          />
        </Paper>

        {genresBooks?.map(({ books }, i) => (
          <Paper
            key={GenreList?.[i].id}
            elevation={0}
          >
            <SliderSection
              title={GenreList?.[i].name}
              href={`/catalog/${GenreList?.[i].id}`}
              items={books}
            />
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}
