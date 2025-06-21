import { ReactNode } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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
