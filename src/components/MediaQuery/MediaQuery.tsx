"use client";

import { Breakpoint } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

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
