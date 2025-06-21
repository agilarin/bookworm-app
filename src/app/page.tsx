import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { getBooks } from "@/lib/firebase/books";
import { BasicCard } from "@/components/UI/BasicCard";

export default async function Home() {
  const { books } = await getBooks({});

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
            {books?.map((book) => (
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
