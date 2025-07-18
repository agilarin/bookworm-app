import MUISelect, { selectClasses, SelectProps } from "@mui/material/Select";
import { styled } from "@mui/material/styles";

export const Select = styled(MUISelect)<SelectProps>`
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
