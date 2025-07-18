"use client";

import Link from "next/link";
import MenuItem, { menuItemClasses } from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import { GenreMenuType, GenreType } from "@/types/bookTypes";

interface BurgerMenuItemProps {
  item: GenreType | GenreMenuType;
  onClick?: () => void;
  onMouseEnter?: () => void;
  selected?: boolean;
  isLink?: boolean;
}

export function BurgerMenuItem({
  isLink,
  item,
  onMouseEnter,
  onClick,
  selected,
}: BurgerMenuItemProps) {
  return (
    <MenuItem
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      component={isLink ? Link : "li"}
      href={`/catalog/${item.id}`}
      sx={{
        borderRadius: 1,
        py: 1,
        [`&.${menuItemClasses.selected}`]: {
          bgcolor: "rgba(0, 0, 0, 0.04)",
          "&:hover": {
            bgcolor: "rgba(0, 0, 0, 0.04)",
          },
        },
      }}
      selected={selected}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flex={1}
        gap={2}
      >
        <Typography
          component="div"
          sx={{ textWrap: "wrap" }}
        >
          {item.name}
        </Typography>
        {"genres" in item && item?.genres?.length && (
          <ArrowForwardIosRoundedIcon
            fontSize="small"
            color="disabled"
          />
        )}
      </Stack>
    </MenuItem>
  );
}
