"use client";

import AppBar, { AppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";

export const Root = styled(AppBar)<AppBarProps>`
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: rgba(0, 0, 0, 0.12) 0 1px 3px;
`;
