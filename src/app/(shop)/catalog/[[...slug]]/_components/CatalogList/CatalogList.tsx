import Grid from "@mui/material/Grid";
import { BookType } from "@/types";
import { BasicCard } from "@/components/UI/BasicCard";

interface ItemListProps {
  books: BookType[];
}

export function CatalogList({ books }: ItemListProps) {
  return (
    <Grid
      container
      spacing={{ xs: 1.5, md: 2 }}
      paddingX={2}
      paddingY={1}
      columns={{ xs: 2, sm: 4, md: 4, lg: 5 }}
    >
      {books.map((book) => (
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
  );
}
