import {IconButton, IconButtonProps, styled} from "@mui/material";


export const Image = styled("img")`
  display: block;
  width: 90px;
  border-radius: ${({theme}) => theme.shape.borderRadius}px;
  object-fit: cover;
`


export const Button = styled(IconButton)<IconButtonProps>`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
`