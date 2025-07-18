"use client";

import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import { GenreMenuType } from "@/types";
import { BurgerMenuMobileContent } from "./components/BurgerMenuMobileContent";

interface BurgerMenuMobileProps {
  genreMenus: GenreMenuType[];
  open: boolean;
  onClose: () => void;
}

export function BurgerMenuMobile({
  genreMenus,
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
          items={genreMenus}
          onReturnBack={onClose}
          onClose={onClose}
        />
      </Stack>
    </Modal>
  );
}
