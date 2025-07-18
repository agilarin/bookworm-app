"use client";

import { styled } from "@mui/material/styles";
import BotNavAction, {
  bottomNavigationActionClasses,
  BottomNavigationActionTypeMap,
} from "@mui/material/BottomNavigationAction";
import { ExtendButtonBase } from "@mui/material/ButtonBase";

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
