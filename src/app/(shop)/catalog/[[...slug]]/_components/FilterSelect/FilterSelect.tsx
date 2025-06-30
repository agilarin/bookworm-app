"use client";

import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import { JSX, useState } from "react";

interface FilterSelectProps {
  items?: JSX.Element[];
}

const openListStyles = {
  maxHeight: "350px",
  overflowY: "scroll",
};

export function FilterSelect({ items }: FilterSelectProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);

  return (
    <Stack
      direction="column"
      alignItems="flex-start"
    >
      <Stack
        component="ul"
        width={1}
        gap={0.25}
        sx={open ? openListStyles : {}}
      >
        {open ? items : items?.slice(0, 8)}
      </Stack>

      {!!items?.length && items?.length > 8 && (
        <Link
          component="button"
          underline="none"
          fontSize="14px"
          sx={{
            mt: 0.5,
            marginLeft: 0.75,
          }}
          onClick={handleClick}
        >
          {open ? "Свернуть" : "Посмотреть все"}
        </Link>
      )}
    </Stack>
  );
}
