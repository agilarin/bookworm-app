"use client";

import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Category, CategoryProps } from "../Category";
import { FilterItem } from "../FilterItem";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";

export type FilterMobileProps = CategoryProps;

export function FilterMobile({ genresList, slug }: FilterMobileProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={handleOpen}
        startIcon={<TuneRoundedIcon />}
        color="inherit"
        size="small"
        variant="outlined"
        sx={{
          fontSize: 14,
          paddingY: 0.125,
          borderColor: "grey.400",
        }}
      >
        Фильтры
      </Button>
      <Drawer
        open={open}
        onClose={handleClose}
        anchor="right"
        slotProps={{
          paper: {
            sx: { width: 1 },
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          py={0.75}
          paddingLeft={1.5}
          paddingRight={1}
          borderBottom={(theme) => "1px solid " + theme.palette.divider}
        >
          <Typography
            fontSize={16}
            fontWeight={500}
          >
            Фильтры
          </Typography>
          <IconButton
            size="small"
            onClick={handleClose}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        <Stack
          overflow="auto"
          padding={1.5}
        >
          <FilterItem title={"Жанры"}>
            <Category
              genresList={genresList}
              slug={slug}
            />
          </FilterItem>
        </Stack>
      </Drawer>
    </>
  );
}
