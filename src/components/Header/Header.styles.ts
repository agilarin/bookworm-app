import {
  styled,
  AppBar,
  IconButton,
  AppBarProps,
  Badge as MuiBadge,
  BadgeProps,
  badgeClasses,
  ExtendButtonBase,
  IconButtonTypeMap,
} from "@mui/material";

export const Root = styled(AppBar)<AppBarProps>`
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: rgba(0, 0, 0, 0.12) 0 1px 3px;
`;

export const Button = styled(IconButton)`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  color: ${({ theme }) => theme.palette.text.primary};
` as ExtendButtonBase<IconButtonTypeMap<object, "button">>;

export const Badge = styled(MuiBadge)<BadgeProps>`
  & .${badgeClasses.badge} {
    font-size: 10px;
    padding: 0 4px;
    height: 16px;
    min-width: 16px;
    min-height: 16px;
  }
`;
