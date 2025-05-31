// import { styled } from "@mui/material/styles";
import {
  styled,
  BottomNavigationAction as BotNavAction,
  // BottomNavigationActionProps as BotNavActionProps,
  bottomNavigationActionClasses,
  ExtendButtonBase,
  BottomNavigationActionTypeMap,
} from "@mui/material";

type NavButtonProps = ExtendButtonBase<
  BottomNavigationActionTypeMap<object, "button">
>;

export const NavButton = styled(BotNavAction)`
  max-width: none;

  &
    .${bottomNavigationActionClasses.label}.${bottomNavigationActionClasses.selected} {
    font-size: 12px;
  }
` as NavButtonProps;
