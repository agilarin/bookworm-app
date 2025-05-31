import { MenuItem, Stack, Typography } from "@mui/material";
import { Link } from "react-router";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface CategoryItemProps {
  value: string;
  href: string;
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
      to={href}
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
