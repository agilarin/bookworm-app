import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface CategoryItemProps {
  value: string;
  href: Url;
  back?: boolean;
  active?: boolean;
  nestingLevel?: number;
}

export function CategoryItem({
  value,
  back,
  href,
  active,
  nestingLevel = 0,
}: CategoryItemProps) {
  if (back) {
    nestingLevel = 0;
  }

  return (
    <MenuItem
      component={Link}
      href={href}
      selected={active}
      sx={{
        borderRadius: 1,
        paddingX: 1,
        marginLeft: nestingLevel * 2,
      }}
    >
      {back && (
        <Stack width={16}>
          <ArrowBackIosNewIcon sx={{ fontSize: "14px" }} />
        </Stack>
      )}
      <Typography
        fontSize={14}
        // fontWeight={(back || undefined) && 500}
        color={(active || undefined) && "primary"}
        sx={{ textWrap: "wrap" }}
      >
        {value}
      </Typography>
    </MenuItem>
  );
}
