"use client";

import { styled } from "@mui/material/styles";

export const ImagePreview = styled("img")`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  width: 220px;

  ${({ theme }) => theme.breakpoints.up("md")} {
    width: 220px;
  }
`;
