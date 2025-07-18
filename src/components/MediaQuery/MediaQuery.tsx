"use client";

import { Breakpoint } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { RequireAtLeastOne } from "@/types";

interface MediaQueryProps {
  minWidth?: Breakpoint | number;
  maxWidth?: Breakpoint | number;
  children: React.ReactNode;
}

export function MediaQuery({
  children,
  minWidth = 0,
  maxWidth = 0,
}: RequireAtLeastOne<MediaQueryProps, "minWidth" | "maxWidth">) {
  const isMinWidth = useMediaQuery((theme) => theme.breakpoints.up(minWidth));
  const isMaxWidth = useMediaQuery((theme) => theme.breakpoints.down(maxWidth));

  if ((!minWidth || isMinWidth) && (!maxWidth || isMaxWidth)) {
    return children;
  }
}
