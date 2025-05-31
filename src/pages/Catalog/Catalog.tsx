import { Container, Grid, Paper, useMediaQuery, Stack } from "@mui/material";
import { CatalogHeader } from "@/pages/Catalog/components/CatalogHeader";
import { ItemList } from "./components/ItemList";
import { Filter } from "./components/Filter";
import { FullPageLoader } from "@/components/FullPageLoader";
import { useFetchGenreAndBooks } from "./useFetchGenreAndBooks";
import { Pagination } from "./components/Pagination";

export function Catalog() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const { genre, books, isLoading, nextPage, prevPage, pages, currentPage } =
    useFetchGenreAndBooks();

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (!books) {
    return null;
  }

  return (
    <Container>
      <Grid
        container
        position="relative"
        alignItems="flex-start"
        paddingY={{ md: 2 }}
        spacing={2}
      >
        {matches && (
          <Grid width="256px">
            <Filter />
          </Grid>
        )}

        <Grid size="grow">
          <Paper elevation={0}>
            <CatalogHeader title={genre?.name || "Каталог"} />
            <ItemList books={books} />
            <Stack
              direction="row"
              justifyContent="center"
              paddingTop={1}
              paddingX={2}
              paddingBottom={2}
            >
              <Pagination
                page={currentPage}
                count={pages}
                onNext={nextPage}
                onPrev={prevPage}
              />
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
