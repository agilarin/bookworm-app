import {InputBase, IconButton, styled, iconButtonClasses} from "@mui/material";


export const CustomInput = styled(InputBase)`
  width: 48px;
  text-align: center;
  
  input {
    text-align: center;
  }
`

export const CountButton = styled(IconButton)`
  padding: 6px;
  border-radius: ${({theme}) => theme.shape.borderRadius}px;
  background: ${({theme}) => theme.palette.grey[100]};
  color: ${({theme}) => theme.palette.text.primary};
  
  &:hover {
    background: ${({theme}) => theme.palette.grey[200]};
  }
  
  &.${iconButtonClasses.disabled} {
    background: ${({theme}) => theme.palette.grey[50]};
  }
`