"use client";

import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import { GenreType } from "@/types";
import { BurgerMenuMobileContent } from "./components/BurgerMenuMobileContent";

interface BurgerMenuMobileProps {
  genreList: GenreType[];
  open: boolean;
  onClose: () => void;
}

export function BurgerMenuMobile({
  genreList,
  open,
  onClose,
}: BurgerMenuMobileProps) {
  return (
    <Modal open={open}>
      <Stack
        height="calc(100vh - 56px)"
        bgcolor="background.paper"
      >
        <BurgerMenuMobileContent
          title="Каталог"
          genres={genreList}
          onReturnBack={onClose}
          onClose={onClose}
        />
      </Stack>
    </Modal>
  );
}
