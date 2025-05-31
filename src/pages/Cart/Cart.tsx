import { useMemo } from "react";
import { Container, Grid, useMediaQuery } from "@mui/material";
import { selectCart } from "@/redux";
import { useGetBooksByIdsQuery } from "@/redux/services/bookApi";
import { useAppSelector } from "@/hooks/useAppSelector";
import { CartOrder } from "./components/CartOrder";
import { CartContent } from "./components/CartContent";
import { EmptyCart } from "./components/EmptyCart";
import { FullPageLoader } from "@/components/FullPageLoader";

export function Cart() {
  const isDownMD = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const cart = useAppSelector(selectCart);
  const cartItemsId = cart.items.map((item) => item.bookId);
  const { data: books, isLoading } = useGetBooksByIdsQuery(cartItemsId);

  const fetchedCart = useMemo(() => {
    return {
      ...cart,
      items: cart.items.map((item) => ({
        ...item,
        book: books?.find((book) => book.id === item.bookId),
      })),
    };
  }, [cart, books]);

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (!cart || !cart.items.length) {
    return <EmptyCart />;
  }

  return (
    <Container disableGutters={isDownMD}>
      <Grid
        container
        position="relative"
        alignItems="flex-start"
        gap={{ xs: 1, md: 2 }}
      >
        <Grid
          size={{ xs: 12, md: "grow" }}
          paddingY={{ md: 2 }}
        >
          <CartContent cart={fetchedCart} />
        </Grid>

        <Grid
          width={{ xs: 1, md: "30%" }}
          paddingY={{ md: 2 }}
          left={0}
          top={64}
          position={{ md: "sticky" }}
        >
          <CartOrder cart={fetchedCart} />
        </Grid>
      </Grid>
    </Container>
  );
}
