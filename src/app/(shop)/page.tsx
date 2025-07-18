import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

import { getBooks, getBooksById } from "@/lib/server/books";
import { getGenreMenus } from "@/lib/server/genres";
import { CarouselSection } from "@/components/CarouselSection";
import { ShopContainer } from "@/components/UI/ShopContainer";
import { BookPreviewCarouselSection } from "@/components/BookPreviewCarouselSection";

const booksPreviewIds = [
  "RtyKqolIJxvyiytGcLi2",
  "LJkPx9KqDG6jWtghmGrM",
  "uKhA4Se9fABNKoyBIXgo",
  "gdkBDHoLGGTkR5Z1bfK8",
];

export default async function Home() {
  const genreMenus = await getGenreMenus();
  const [booksPreview, popularBooks, ...genresBooks] = await Promise.all([
    getBooksById(booksPreviewIds),
    getBooks({ sort: "popularDesc", limit: 10 }),
    ...(genreMenus || [])?.map((item) => {
      return getBooks({
        genreIds: item.genreIds,
        sort: "ratingDesc",
        limit: 10,
      });
    }),
  ]);

  return (
    <ShopContainer>
      <Stack
        paddingY={2}
        gap={{ xs: 1, md: 2.5 }}
      >
        <Paper elevation={0}>
          <BookPreviewCarouselSection items={booksPreview} />
        </Paper>

        <Paper elevation={0}>
          <CarouselSection
            title="Популярное"
            href={`/catalog?sort=popularDesc`}
            items={popularBooks.books}
          />
        </Paper>

        {genresBooks?.map(({ books }, i) => (
          <Paper
            key={genreMenus?.[i].id}
            elevation={0}
          >
            <CarouselSection
              title={genreMenus?.[i].name}
              href={`/catalog/${genreMenus?.[i].id}`}
              items={books}
            />
          </Paper>
        ))}
      </Stack>
    </ShopContainer>
  );
}
