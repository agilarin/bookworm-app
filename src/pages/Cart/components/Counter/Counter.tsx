import { ChangeEvent, useEffect, useState, FocusEvent } from "react";
import { Box } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { useAppDispatch } from "@/hooks/useAppDispatch.ts";
import {
  decrementQuantityItemCart,
  incrementQuantityItemCart,
  updateItemCart,
} from "@/redux/cartSlice.ts";
import * as S from "./Counter.styles.ts";
import { CartItemType } from "@/types/index.ts";

export function Counter({ bookId, quantity }: CartItemType) {
  const [value, setValue] = useState(quantity);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setValue(quantity);
  }, [quantity]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value)) {
      setValue(value);
    }
  };
  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value > 0) {
      dispatch(updateItemCart({ bookId, quantity: value }));
    } else {
      dispatch(updateItemCart({ bookId, quantity: 1 }));
    }
  };
  const handleDecrement = () =>
    dispatch(decrementQuantityItemCart({ bookId, quantity: quantity - 1 }));
  const handleIncrement = () =>
    dispatch(incrementQuantityItemCart({ bookId, quantity: quantity + 1 }));

  return (
    <Box
      display="flex"
      alignItems="center"
    >
      <S.CountButton
        size="small"
        disabled={value < 2}
        onClick={handleDecrement}
      >
        <RemoveRoundedIcon fontSize="small" />
      </S.CountButton>

      <S.CustomInput
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <S.CountButton
        size="small"
        onClick={handleIncrement}
      >
        <AddRoundedIcon fontSize="small" />
      </S.CountButton>
    </Box>
  );
}
