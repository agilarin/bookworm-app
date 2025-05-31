import { Grid } from "@mui/material";
import { BasicCard } from "@/components/BasicCard";
import { BookType } from "@/types";

interface ItemListProps {
  books: BookType[];
}

export function ItemList({ books }: ItemListProps) {
  return (
    <Grid
      container
      spacing={{ xs: 1.5, md: 2 }}
      paddingX={{ md: 2 }}
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
