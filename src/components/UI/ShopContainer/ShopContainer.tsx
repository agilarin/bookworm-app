"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import Container from "@mui/material/Container";

export function ShopContainer({ children }: { children?: React.ReactNode }) {
  const isDownMD = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return <Container disableGutters={isDownMD}>{children}</Container>;
}
