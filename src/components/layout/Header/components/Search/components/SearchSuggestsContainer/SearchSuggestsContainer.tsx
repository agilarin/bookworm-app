"use client"

import { ReactNode, useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

interface SearchSuggestsContainerProps {
  children: ReactNode;
}

export function SearchSuggestsContainer({
  children,
}: SearchSuggestsContainerProps) {
  const [rootTop, setRootTop] = useState<string>("0");

  const getRefRect = useCallback((node: HTMLDivElement) => {
    const rectTop = node?.getBoundingClientRect()?.top || 0;
    setRootTop(rectTop + "px");
  }, []);

  return (
    <Box
      ref={getRefRect}
      position="absolute"
      left={0}
      right={0}
      top="100%"
      display="flex"
      maxHeight={`calc(100vh - ${rootTop} - 16px)`}
      marginTop={0.5}
    >
      <Box
        component={Paper}
        overflow="hidden"
        display="flex"
        flex={1}
        borderRadius={2}
      >
        {children}
      </Box>
    </Box>
  );
}
