import { styled } from "@mui/material/styles";
import { Select as MuiSelect, selectClasses, SelectProps } from "@mui/material";

export const Select = styled(MuiSelect)<SelectProps>`
  border-radius: ${(props) => props.theme.shape.borderRadius}px;
  font-size: 14px;
  border: 1px solid ${(props) => props.theme.palette.grey[400]};

  &::before,
  &::after {
    content: none;
  }

  & .${selectClasses.select} {
    padding: 3px 12px;
  }
`;
