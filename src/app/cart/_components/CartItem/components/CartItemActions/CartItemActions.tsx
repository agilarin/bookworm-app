import {styled, Stack, IconButton, IconButtonProps} from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { removeItemFromCart } from "@/redux/cartSlice";


export const Button = styled(IconButton)<IconButtonProps>`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
`

interface CartItemActionsProps {
  bookId: string | number
}

export function CartItemActions({bookId}: CartItemActionsProps) {
  const dispatch = useAppDispatch();
  const handleRemove = () => dispatch(removeItemFromCart(bookId))

  return (
    <Stack
      direction="row"
      alignItems="center"
    >
      <Button 
        size="small" 
        onClick={handleRemove}
      >
        <DeleteOutlinedIcon />
      </Button>
    </Stack>
  )
}
