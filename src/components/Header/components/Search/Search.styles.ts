import {
  styled,
  InputBase,
  InputBaseProps,
  IconButton,
  IconButtonProps,
  Box,
  BoxProps,
} from "@mui/material";

interface InputWrapperProps extends BoxProps {
  open: boolean;
}

export const InputWrapper = styled(Box)<InputWrapperProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.background.paper};
  background-color: ${({ theme, open }) => !open && theme.palette.grey[200]};
  border-radius: ${({ theme }) => theme.shape.borderRadius * 2}px;
`;

export const SearchInput = styled(InputBase)<InputBaseProps>`
  width: 100%;
  padding: 0 8px 0 16px;
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const SearchButton = styled(IconButton)<IconButtonProps>`
  //border-radius: ${({ theme }) => theme.shape.borderRadius}px;

  &:hover {
    background-color: transparent;
    // background-color: ${({ theme }) => theme.palette.primary.light};
  }
`;
