"use client";

import Grid from "@mui/material/Grid";

import { ShopContainer } from "@/components/UI/ShopContainer";
import { FullPageLoader } from "@/components/UI/Loader";
import { EmptyCart } from "./_components/EmptyCart";
import { CartContent } from "./_components/CartContent";
import { CartOrder } from "./_components/CartOrder";
import { useCartWithBooks } from "./useCartWithBooks";

export default function Cart() {
  const { isLoading, cart, cartWithBooks } = useCartWithBooks();

  if (!isLoading && !cart?.items?.length) {
    return <EmptyCart />;
  }

  if (isLoading && !cartWithBooks?.items?.length) {
    return <FullPageLoader />;
  }

  return (
    <ShopContainer>
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
          <CartContent cart={cartWithBooks} />
        </Grid>

        <Grid
          width={{ xs: 1, md: "30%" }}
          paddingY={{ md: 2 }}
          left={0}
          top={64}
          position={{ md: "sticky" }}
        >
          <CartOrder cart={cartWithBooks} />
        </Grid>
      </Grid>
    </ShopContainer>
  );
}
