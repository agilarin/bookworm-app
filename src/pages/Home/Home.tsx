import { Container, Grid, Paper, Stack } from "@mui/material";
import { useGetBooksMutation } from "@/redux/services/bookApi";
import { BasicCard } from "@/components/BasicCard";
import { FullPageLoader } from "@/components/FullPageLoader";
import { useLayoutEffect } from "react";

export function Home() {
  const [getBooks, { data, isLoading }] = useGetBooksMutation();

  useLayoutEffect(() => {
    getBooks();
  }, [getBooks]);

  if (isLoading) {
    return <FullPageLoader />;
  }

  return (
    <Container>
      <Stack
        spacing="20px"
        paddingY={2}
      >
        <Paper elevation={0}>
          <Grid
            container
            paddingY={1.5}
            paddingX={{ md: 2 }}
            spacing={{ xs: 1.5, md: 2 }}
            columns={{ xs: 2, sm: 3, md: 5, lg: 6 }}
          >
            {data?.books?.map((book) => (
              <Grid
                display="flex"
                justifyContent="center"
                key={book.id}
                size={1}
              >
                <BasicCard book={book} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Stack>
    </Container>
  );
}
