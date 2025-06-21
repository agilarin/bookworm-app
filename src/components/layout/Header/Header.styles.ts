"use client";

import { styled, AppBar, AppBarProps } from "@mui/material";

export const Root = styled(AppBar)<AppBarProps>`
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: rgba(0, 0, 0, 0.12) 0 1px 3px;
`;
