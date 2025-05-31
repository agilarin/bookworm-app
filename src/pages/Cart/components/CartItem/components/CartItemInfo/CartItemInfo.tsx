import {Link} from "react-router";
import {Typography, Stack, useMediaQuery} from "@mui/material";
import { CartItemActions } from "../CartItemActions";

interface CartItemInfoProps {
  href: string,
  title: string,
  authors: string,
  bookId: string | number,
  totalPrice: number
}

export function CartItemInfo({href, title, authors, bookId, totalPrice}: CartItemInfoProps) {
  const isUpMD = useMediaQuery(theme => theme.breakpoints.up("md"))
  
  return (
    <Stack
      alignItems="flex-start"
      flex={1}
      spacing={1.5}
    >
    <Link to={href}>
    {!isUpMD && (
        <Typography
          marginBottom={1}
          color="textPrimary"
          fontSize="16px"
          fontWeight="500"
          component="div"
        >
          {totalPrice} ₽
        </Typography>
      )}

      <Typography
        color="textPrimary"
        component="h1"
        variant="body1"
      >
        {title}
      </Typography>
      <Typography
        color="textSecondary"
        variant="subtitle2"
        component="p"
      >
        {authors}
      </Typography>
    </Link>

    {isUpMD && (
      <CartItemActions bookId={bookId}/>
      )}
  </Stack>
  );
};