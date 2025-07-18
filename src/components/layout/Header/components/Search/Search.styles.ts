import Box, { BoxProps } from "@mui/material/Box";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";

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
  border-radius: ${({ theme }) => (theme.shape.borderRadius as number) * 2}px;
`;

export const SearchInput = styled(InputBase)<InputBaseProps>`
  width: 100%;
  padding: 0 8px 0 16px;
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const SearchButton = styled(IconButton)<IconButtonProps>`
  &:hover {
    background-color: transparent;
  }
`;
