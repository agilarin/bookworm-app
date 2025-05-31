import { Box, Paper, Typography, Stack } from "@mui/material";
import { CartItem } from "@/pages/Cart/components/CartItem";
import { CartType } from "@/types";

interface CartContentProps {
  cart: CartType;
}

export function CartContent({ cart }: CartContentProps) {
  return (
    <Paper elevation={0}>
      <Box
        paddingX={2}
        paddingY={1.5}
      >
        <Typography
          variant="h6"
          component="h1"
        >
          Карзина
        </Typography>

        <Stack
          paddingTop={1.5}
          spacing={2}
        >
          {Object.values(cart.items).map((item) => (
            <CartItem
              key={item.bookId}
              item={item}
            />
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}
