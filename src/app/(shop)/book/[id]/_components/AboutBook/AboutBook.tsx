import Link from "next/link";
import { BookType } from "@/types";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { ExpandableText } from "../ExpandableText";
import { DetailList } from "../DetailList";

interface AboutBookProps {
  book: BookType;
}

export function AboutBook({ book }: AboutBookProps) {
  const details = [
    { name: "Возрастные ограничения:", value: book?.ageRating },
    { name: "Количество страниц:", value: book?.pages },
    { name: "ISBN:", value: book?.isbn },
    { name: "Правообладатель:", value: book?.publisher?.name },
  ];

  return (
    <Box
      padding={2}
      paddingY={1.5}
    >
      <ExpandableText text={book?.description} />

      <Stack
        marginTop={2}
        direction="row"
        flexWrap="wrap"
        gap={1}
      >
        {book.genres.map(({ name, id }) => (
          <Chip
            key={id}
            variant="outlined"
            label={name}
            clickable
            component={Link}
            href={`/catalog/${id}`}
            sx={{ borderRadius: 1, height: "26px", span: { px: 1.25 } }}
          />
        ))}
        {book.tags.map(({ name, id }) => (
          <Chip
            key={id}
            variant="outlined"
            label={"#" + name}
            sx={{ borderRadius: 1, height: "26px", span: { px: 1.25 } }}
          />
        ))}
      </Stack>

      <Box marginTop={3}>
        <DetailList details={details} />
      </Box>
    </Box>
  );
}
