"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

interface PaginationProps {
  page: number | undefined;
  count: number;
}

export function Pagination({ page = 1, count }: PaginationProps) {
  const pathname = usePathname();

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
    >
      <Button
        startIcon={<ArrowBackRoundedIcon />}
        color="inherit"
        disabled={page === 1}
        component={Link}
        href={`${pathname}?page=${page - 1}`}
      >
        Предыдущая
      </Button>
      <Typography fontSize={15}>
        {page} из {count}
      </Typography>
      <Button
        endIcon={<ArrowForwardRoundedIcon />}
        color="inherit"
        component={Link}
        href={`${pathname}?page=${page + 1}`}
        disabled={page === count}
      >
        Следующая
      </Button>
    </Stack>
  );
}
