import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { removeCartItem } from "@/store";

export const CustomButton = styled(IconButton)<IconButtonProps>`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
`;

interface CartItemActionsProps {
  bookId: string;
}

export function CartItemActions({ bookId }: CartItemActionsProps) {
  const dispatch = useAppDispatch();
  const handleRemove = () => dispatch(removeCartItem(bookId));

  return (
    <Stack
      direction="row"
      alignItems="center"
    >
      <CustomButton
        size="small"
        onClick={handleRemove}
      >
        <DeleteOutlinedIcon />
      </CustomButton>
    </Stack>
  );
}
