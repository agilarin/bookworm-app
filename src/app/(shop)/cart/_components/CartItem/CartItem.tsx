import Link from "next/link";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CartItemWithBookType } from "@/types";
import { Counter } from "../Counter";
import { CartItemInfo } from "./components/CartItemInfo";
import { CartItemActions } from "./components/CartItemActions";
import { OptimizedImage } from "@/components/OptimizedImage";
import { MediaQuery } from "@/components/MediaQuery";

interface CartItemProps {
  item: CartItemWithBookType;
}

export function CartItem({ item }: CartItemProps) {
  const book = item.book;
  const totalPrice = item.quantity * book.price;
  const authors = book.authors.map((item) => item.name).join(" ,");

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      alignItems="flex-start"
      justifyContent="space-between"
      gap={2}
    >
      <Stack
        direction="row"
        width="100%"
        flex={{ md: 1 }}
        spacing={2}
      >
        <Link href={`/book/${item.bookId}`}>
          <OptimizedImage
            images={book.images}
            covers={[100, 100]}
            alt={book.title}
            defaultCover={100}
            imgComponent={(props) => (
              <Box
                component="img"
                {...props}
                borderRadius={1}
                width={90}
                sx={{ objectFit: "cover", aspectRatio: "2 / 3" }}
                bgcolor="grey.300"
              />
            )}
          />
        </Link>

        <CartItemInfo
          title={book.title}
          authors={authors}
          bookId={book.id}
          totalPrice={totalPrice}
        />
      </Stack>

      <Counter
        bookId={item.bookId}
        quantity={item.quantity}
      />

      <MediaQuery minWidth="md">
        <Typography
          minWidth="120px"
          textAlign="center"
          color="textPrimary"
          fontSize="18px"
          fontWeight="500"
          component="div"
        >
          {totalPrice} ₽
        </Typography>
      </MediaQuery>

      <MediaQuery maxWidth="md">
        <CartItemActions bookId={item.bookId} />
      </MediaQuery>
    </Stack>
  );
}
