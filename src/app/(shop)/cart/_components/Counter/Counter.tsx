import { ChangeEvent, useEffect, useState, FocusEvent } from "react";
import { Box } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { updateCartItemQuantity } from "@/store";
import * as S from "./Counter.styles";

interface CounterProps {
  bookId: string;
  quantity: number;
}

export function Counter({ bookId, quantity }: CounterProps) {
  const [value, setValue] = useState(quantity);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setValue(quantity);
  }, [quantity]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value > 0) {
      setValue(value);
    }
  };
  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (newValue === quantity) return;

    if (!isNaN(newValue) && newValue > 0) {
      dispatch(updateCartItemQuantity({ bookId, quantity: newValue }));
    } else {
      dispatch(updateCartItemQuantity({ bookId, quantity: 1 }));
    }
  };
  const handleDecrement = () =>
    dispatch(updateCartItemQuantity({ bookId, quantity: quantity - 1 }));
  const handleIncrement = () =>
    dispatch(updateCartItemQuantity({ bookId, quantity: quantity + 1 }));

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
