"use client";

import Link from "next/link";
import IconButton from "@mui/material/IconButton";

import { CartBadge } from "@/components/CartBadge";

export function CartButton() {
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
      <CartBadge />
    </IconButton>
  );
}
