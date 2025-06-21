"use client";

import Link from "next/link";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCart } from "@/redux/cartSlice";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";

export function CartButton() {
  const cart = useAppSelector(selectCart);

  const cartTotal = cart.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <IconButton
      size="medium"
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
      }}
      component={Link}
      href="/cart"
    >
      <Badge
        badgeContent={cartTotal}
        color="primary"
        slotProps={{
          badge: {
            sx: {
              fontSize: "10px",
              padding: "0 4px",
              height: "16px",
              minWidth: "16px",
              minHeight: "16px",
            },
          },
        }}
      >
        <ShoppingBasketOutlinedIcon />
      </Badge>
    </IconButton>
  );
}
