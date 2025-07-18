import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { CartWithBooksType } from "@/types";
import { CartOrderRow } from "./components/CartOrderRow";

interface CartOrderProps {
  cart: CartWithBooksType;
}

export function CartOrder({ cart }: CartOrderProps) {
  let totalPrice = 0;
  let totalCount = 0;

  cart.items?.forEach((item) => {
    if (item.book) {
      totalCount += item.quantity;
      totalPrice += item.book.price * item.quantity;
    }
  });

  return (
    <Paper elevation={0}>
      <Box
        paddingTop={2}
        paddingBottom={1.5}
        paddingX={2}
      >
        <Stack
          spacing={1}
          marginBottom={2}
        >
          <CartOrderRow
            name={`Книги, ${totalCount} шт.`}
            value={`${totalPrice} ₽`}
          />
          <CartOrderRow
            variant="total"
            name="Итого"
            value={`${totalPrice} ₽`}
          />
        </Stack>

        <Button
          size="large"
          variant="contained"
          disableElevation
          fullWidth
        >
          Перейти к оформлению
        </Button>
      </Box>
    </Paper>
  );
}
