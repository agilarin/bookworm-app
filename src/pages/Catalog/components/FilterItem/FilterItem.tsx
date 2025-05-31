import { ReactNode } from "react";
import { Stack, Typography } from "@mui/material";

interface FilterItemProps {
  title: string;
  children?: ReactNode;
}

export function FilterItem({ title, children }: FilterItemProps) {
  return (
    <Stack>
      <Typography
        fontSize={16}
        fontWeight={500}
        mb={1}
      >
        {title}
      </Typography>
      {children}
    </Stack>
  );
}
