"use client";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useAppDispatch } from "@/hooks/reduxHooks";
import { addCartItem } from "@/store";

interface BookCartActionsProps {
  bookId: string;
  price: number;
}

export function BookCartActions({ bookId, price }: BookCartActionsProps) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (bookId) {
      dispatch(addCartItem({ bookId, quantity: 1 }));
    }
  };

  return (
    <Stack
      paddingX={2}
      paddingY={1.5}
      direction={{ md: "row" }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography
        component="div"
        variant="h4"
        fontWeight={500}
      >
        {price} ₽
      </Typography>
      <Button
        size="large"
        variant="contained"
        disableElevation
        sx={{ minWidth: "240px" }}
        onClick={handleClick}
      >
        Добавить в карзину
      </Button>
    </Stack>
  );
}
