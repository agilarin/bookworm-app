"use client";

import { useMemo } from "react";
import { selectCart } from "@/redux";
import { useQuery } from "@tanstack/react-query";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { EmptyCart } from "./_components/EmptyCart";
import { useAppSelector } from "@/hooks/useAppSelector";
import { FullPageLoader } from "@/components/FullPageLoader";
import { getCartItems } from "./getCartItems.action";
import { CartContent } from "./_components/CartContent";
import { CartOrder } from "./_components/CartOrder";

export default function Cart() {
  const isDownMD = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const cart = useAppSelector(selectCart);
  const cartItemsId = cart.items.map((item) => item.bookId);
  const { data: books } = useQuery({
    queryKey: ["cartItems", cartItemsId],
    queryFn: () => getCartItems(cartItemsId),
    enabled: !!cartItemsId.length,
  });

  const fetchedCart = useMemo(() => {
    const items = cart.items.map((item) => ({
      ...item,
      book: books?.find((book) => book.id === item.bookId),
    }));
    return {
      ...cart,
      items: items.filter(({ book }) => !!book),
    };
  }, [cart, books]);

  if (!cart || !cart.items.length) {
    return <EmptyCart />;
  }

  if (!fetchedCart.items.length) {
    return <FullPageLoader />;
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
