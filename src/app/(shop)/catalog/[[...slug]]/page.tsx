import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { BooksSortFieldValues, GenerateMetadataProps } from "@/types";
import { getBooks, getBooksFilter } from "@/lib/firebase/books";
import { getGenreById, getGenresList } from "@/lib/firebase/genres";
import { MediaQuery } from "@/components/MediaQuery";
import { Filter } from "./_components/Filter";
import { ItemList } from "./_components/ItemList";
import { CatalogHeader } from "./_components/CatalogHeader";
import { CatalogFooter } from "./_components/CatalogFooter";

type CatalogParams = Promise<{ slug?: string[] }>;
type CatalogSearchParams = Promise<{
  sort?: BooksSortFieldValues;
  page?: string;
  ageRatings?: string | string[];
  publishers?: string | string[];
}>;

export async function generateMetadata({
  params,
}: GenerateMetadataProps<CatalogParams>) {
  const { slug } = await params;

  if (!slug) {
    return { title: "Книги - BookWorm" };
  }
  const genre = await getGenreById(slug[0]);

  if (genre) {
    return { title: `Книги в жанре ${genre.name} - BookWorm` };
  }

  return { title: "Книги - BookWorm" };
}

interface CatalogProps {
  params: CatalogParams;
  searchParams: CatalogSearchParams;
}

export default async function Catalog({ params, searchParams }: CatalogProps) {
  const { slug } = await params;
  const { sort, page, ageRatings, publishers } = await searchParams;

  const genre = slug && (await getGenreById(slug[0]));
  if (slug && !genre) {
    notFound();
  }

  const commonArg = {
    genresId: genre?.genresId || genre?.id,
    publishersId: publishers,
    ageRatings,
  };

  const [genresList, { pages, books }, ageRatingsFilter, publishersFilter] =
    await Promise.all([
      await getGenresList(),
      await getBooks({
        ...commonArg,
        page: page,
        sort: sort,
      }),
      await getBooksFilter({
        name: "ageRating",
        ...commonArg,
      }),
      await getBooksFilter({
        name: "publisher",
        ...commonArg,
      }),
    ]);

  console.log(ageRatingsFilter, publishersFilter);

  return (
    <Container>
      <Grid
        container
        position="relative"
        alignItems="flex-start"
        paddingY={{ md: 2 }}
        spacing={2}
      >
        <MediaQuery minWidth="md">
          <Grid width="256px">
            <Filter
              publishers={publishersFilter}
              ageRatings={ageRatingsFilter}
              genresList={genresList || []}
              slug={slug?.[0]}
            />
          </Grid>
        </MediaQuery>

        <Grid size="grow">
          <Paper elevation={0}>
            <CatalogHeader
              title={genre?.name || "Каталог"}
              publishers={publishersFilter}
              ageRatings={ageRatingsFilter}
              genresList={genresList || []}
              slug={slug?.[0]}
            />
            <ItemList books={books} />

            {Number(pages) > 1 && (
              <CatalogFooter
                page={page}
                count={pages}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
