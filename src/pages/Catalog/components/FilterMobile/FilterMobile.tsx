import { useState } from "react";
import { IconButton, Button, Drawer, Stack, Typography } from "@mui/material";
import { Category } from "../Category";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { FilterItem } from "../FilterItem";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";

export function FilterMobile() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        startIcon={<TuneRoundedIcon />}
        color="inherit"
        size="small"
        variant="outlined"
        sx={(theme) => ({
          fontSize: 14,
          paddingY: 0.125,
          borderColor: theme.palette.grey[400],
        })}
      >
        Фильтры
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
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
            onClick={() => setOpen(false)}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        <Stack
          overflow="auto"
          padding={1.5}
        >
          <FilterItem title={"Жанры"}>
            <Category />
          </FilterItem>
        </Stack>
      </Drawer>
    </>
  );
}
