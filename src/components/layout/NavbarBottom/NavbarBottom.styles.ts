"use client";

import {
  styled,
  BottomNavigationAction as BotNavAction,
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
