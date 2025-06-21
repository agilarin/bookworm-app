"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface CatalogFooterProps {
  count?: number;
  page?: number | string;
}

export function CatalogFooter({ count, page = 1 }: CatalogFooterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (_: unknown, newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo(0, 0);
  };

  return (
    <Stack
      direction="row"
      paddingTop={3}
      paddingX={2}
      paddingBottom={2}
    >
      <Pagination
        count={count}
        page={Number(page)}
        color="primary"
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </Stack>
  );
}
