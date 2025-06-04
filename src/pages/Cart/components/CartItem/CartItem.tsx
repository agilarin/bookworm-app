import { generatePath, Link } from "react-router";
import { Typography, Stack, useMediaQuery, Box } from "@mui/material";
import { CartItemType } from "@/types";
import { ROUTES_PATHS } from "@/constants";
import { Counter } from "@/pages/Cart/components/Counter";
import { CartItemInfo } from "./components/CartItemInfo";
import { CartItemActions } from "./components/CartItemActions";
import { ImagePicture } from "@/components/ImagePicture";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const isUpMD = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const book = item.book;

  if (!book) {
    return;
  }

  const itemUrl = generatePath(ROUTES_PATHS.BOOK, {
    bookId: item.bookId,
  });
  const totalPrice = item.quantity * book.price;

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
        <Link to={itemUrl}>
          <ImagePicture
            images={book.images}
            defaultCover="cover_100"
            imageEl={(img) => (
              <Box
                component="img"
                src={img}
                alt={book.title}
                borderRadius={1}
                width={90}
                sx={{ objectFit: "cover", aspectRatio: "2 / 3" }}
                bgcolor="grey.300"
              />
            )}
          />
        </Link>

        <CartItemInfo
          href={itemUrl}
          title={book.title}
          authors={book.authors.map((item) => item.name).join(" ,")}
          bookId={book.id}
          totalPrice={totalPrice}
        />
      </Stack>

      <Counter
        bookId={item.bookId}
        quantity={item.quantity}
      />

      {isUpMD && (
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
      )}

      {!isUpMD && <CartItemActions bookId={item.bookId} />}
    </Stack>
  );
}
