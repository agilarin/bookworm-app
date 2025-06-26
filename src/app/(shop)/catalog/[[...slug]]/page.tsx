import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { BooksSortFieldValues, GenerateMetadataProps } from "@/types";
import { getBooks } from "@/lib/firebase/books";
import { getGenreById, getGenresList } from "@/lib/firebase/genres";
import { MediaQuery } from "@/components/MediaQuery";
import { Filter } from "./_components/Filter";
import { ItemList } from "./_components/ItemList";
import { CatalogHeader } from "./_components/CatalogHeader";
import { CatalogFooter } from "./_components/CatalogFooter";
import { getBooksTags } from "@/lib/firebase/tags";

type CatalogParams = Promise<{ slug?: string[] }>;
type CatalogSearchParams = Promise<{
  sort?: BooksSortFieldValues;
  page?: string;
  tags?: string;
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
  const { sort, page, tags: tagsId } = await searchParams;

  const genre = slug && (await getGenreById(slug[0]));
  if (slug && !genre) {
    notFound();
  }

  const genresId = genre?.genresId || genre?.id;
  const genresList = await getGenresList();
  const { pages, books } = await getBooks({
    genresId,
    tagsId,
    page: page,
    sort: sort,
  });
  const tags = await getBooksTags({
    genresId,
  });

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
              tags={tags}
              genresList={genresList || []}
              slug={slug?.[0]}
            />
          </Grid>
        </MediaQuery>

        <Grid size="grow">
          <Paper elevation={0}>
            <CatalogHeader
              title={genre?.name || "Каталог"}
              genresList={genresList || []}
              slug={slug?.[0]}
            />
            <ItemList books={books} />
            <CatalogFooter
              page={page}
              count={pages}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
