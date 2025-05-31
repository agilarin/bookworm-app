import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { BurgerMenuItem } from "@/components/UI/BurgerMenuItem";
import { useGetGenresListQuery } from "@/redux/services/genresApi.ts";
import * as S from "./BurgerMenu.styles.ts";
import { GenreType } from "@/types/book.ts";

export function BurgerMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [focusGenre, setFocusGenre] = useState<GenreType | null>(null);
  const [height, setHeight] = useState<number>();
  const { data: genresList } = useGetGenresListQuery();

  const ref = (node: HTMLDivElement | null) => {
    const rect = node?.getBoundingClientRect();
    setHeight(rect?.height);
  };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setFocusGenre(null);
  };

  return (
    <>
      <S.CatalogBtn
        variant="outlined"
        color="primary"
        disableElevation
        onClick={handleOpen}
      >
        <MenuRoundedIcon />
      </S.CatalogBtn>

      <Menu
        open={!!anchorEl}
        onClose={handleClose}
        anchorEl={anchorEl}
        slotProps={{
          list: { sx: { padding: 0 } },
        }}
        sx={{ padding: 0 }}
      >
        <Stack direction="row">
          <Stack
            ref={ref}
            width={256}
            padding={1}
          >
            {genresList?.map((item) => (
              <BurgerMenuItem
                key={item.id}
                item={item}
                onClick={handleClose}
                onMouseEnter={() => setFocusGenre(item)}
                selected={focusGenre?.id === item.id}
                isLink
              />
            ))}
          </Stack>
          {focusGenre && (
            <Stack
              flex={1}
              width={256}
              height={height}
              overflow="auto"
              borderLeft={(theme) => `2px solid ${theme.palette.divider}`}
              padding={1}
            >
              {focusGenre.genres?.map((item) => (
                <BurgerMenuItem
                  onClick={handleClose}
                  key={item.id}
                  item={item}
                  isLink
                />
              ))}
            </Stack>
          )}
        </Stack>
      </Menu>
    </>
  );
}
