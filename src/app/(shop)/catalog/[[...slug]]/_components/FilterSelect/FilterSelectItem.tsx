"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { MenuItem } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

interface FilterSelectItemProps {
  title: string;
  searchParamsName: string;
  searchParamsValue: string;
}

export function FilterSelectItem({
  title,
  searchParamsName,
  searchParamsValue,
}: FilterSelectItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultChecked = new URLSearchParams(searchParams).has(
    searchParamsName,
    searchParamsValue
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    if (event.target.checked) {
      params.append(searchParamsName, searchParamsValue);
    } else {
      params.delete(searchParamsName, searchParamsValue);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  return (
    <MenuItem
      sx={{
        borderRadius: 1,
        paddingY: 0.75,
        paddingX: 1,
      }}
      component="label"
    >
      <Checkbox
        size="small"
        defaultChecked={defaultChecked}
        disableRipple
        sx={{ height: 3, ml: -1 }}
        onChange={handleChange}
      />

      <Typography
        fontSize={14}
        sx={{ textWrap: "wrap" }}
      >
        {title}
      </Typography>
    </MenuItem>
  );
}
