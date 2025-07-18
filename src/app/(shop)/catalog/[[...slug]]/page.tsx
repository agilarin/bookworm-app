import { notFound } from "next/navigation";
// import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { BooksSortFieldValues, GenerateMetadataProps } from "@/types";
import { getBooks } from "@/lib/server/books";
import { getBooksFilter } from "@/lib/server/bookFilters";
import {
  getGenreById,
  getGenreMenuById,
  getGenreMenus,
} from "@/lib/server/genres";
import { MediaQuery } from "@/components/MediaQuery";
import { ShopContainer } from "@/components/UI/ShopContainer";
import { Filter } from "./_components/Filter";
import { CatalogList } from "./_components/CatalogList";
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

  const [genreMenu, genre] = await Promise.all(
    slug ? [getGenreMenuById(slug[0]), getGenreById(slug[0])] : []
  );
  if (slug && !genre && !genreMenu) {
    notFound();
  }

  const commonArg = {
    genreIds: genreMenu?.genreIds || genre?.id,
    publisherIds: publishers,
    ageRatings,
  };

  const [genreMenus, { pages, books }, ageRatingsFilter, publishersFilter] =
    await Promise.all([
      getGenreMenus(),
      getBooks({
        ...commonArg,
        page: page,
        sort: sort,
      }),
      getBooksFilter({
        name: "ageRating",
        ...commonArg,
      }),
      getBooksFilter({
        name: "publisher",
        ...commonArg,
      }),
    ]);

  return (
    <ShopContainer>
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
              genresList={genreMenus || []}
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
              genresList={genreMenus || []}
              slug={slug?.[0]}
            />
            <CatalogList books={books} />

            {Number(pages) > 1 && (
              <CatalogFooter
                page={page}
                count={pages}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </ShopContainer>
  );
}
