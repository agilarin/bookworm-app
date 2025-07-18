import Link from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CartItemActions } from "../CartItemActions";
import { MediaQuery } from "@/components/MediaQuery";

interface CartItemInfoProps {
  title: string;
  authors: string;
  bookId: string;
  totalPrice: number;
}

export function CartItemInfo({
  title,
  authors,
  bookId,
  totalPrice,
}: CartItemInfoProps) {
  return (
    <Stack
      alignItems="flex-start"
      flex={1}
      spacing={1.5}
    >
      <Link href={`/book/${bookId}`}>
        <MediaQuery maxWidth="md">
          <Typography
            marginBottom={1}
            color="textPrimary"
            fontSize="16px"
            fontWeight="500"
            component="div"
          >
            {totalPrice} ₽
          </Typography>
        </MediaQuery>

        <Typography
          color="textPrimary"
          component="h1"
          variant="body1"
        >
          {title}
        </Typography>
        <Typography
          color="textSecondary"
          variant="subtitle2"
          component="p"
        >
          {authors}
        </Typography>
      </Link>

      <MediaQuery minWidth="md">
        <CartItemActions bookId={bookId} />
      </MediaQuery>
    </Stack>
  );
}
