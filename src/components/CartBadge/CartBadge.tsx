import Badge from "@mui/material/Badge";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectCart } from "@/store";

export function CartBadge() {
  const cart = useAppSelector(selectCart);

  const cartTotal = cart?.items?.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
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
            marginTop: {
              xs: "4px",
              md: 0,
            },
          },
        },
      }}
    >
      <ShoppingBasketOutlinedIcon />
    </Badge>
  );
}
