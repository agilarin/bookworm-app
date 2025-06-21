"use client";

import { useState } from "react";
import { GenreType } from "@/types";
import Stack from "@mui/material/Stack";
import { BurgerMenuMobileHeader } from "../BurgerMenuMobileHeader";
import { BurgerMenuItem } from "@/components/UI/BurgerMenuItem";

interface BurgerMenuMobileContentProps {
  onReturnBack: () => void;
  onClose: () => void;
  title: string;
  genres: GenreType[];
}

export function BurgerMenuMobileContent({
  onReturnBack,
  onClose,
  genres,
  title,
}: BurgerMenuMobileContentProps) {
  const [activeGenre, setActiveGenre] = useState<GenreType | null>(null);

  const setAsd = (genre: GenreType) => {
    if (genre.genres) {
      setActiveGenre(genre);
    } else {
      onClose();
    }
  };

  return (
    <>
      {!activeGenre?.genres && (
        <Stack height={1}>
          <BurgerMenuMobileHeader
            title={title}
            onClose={onClose}
            onReturnBack={onReturnBack}
          />
          <Stack
            overflow="auto"
            py={0.5}
          >
            {genres?.map((item) => (
              <BurgerMenuItem
                onClick={() => setAsd(item)}
                key={item.id}
                item={item}
                isLink={!item.genres}
              />
            ))}
          </Stack>
        </Stack>
      )}

      {activeGenre?.genres && (
        <BurgerMenuMobileContent
          title={activeGenre.name}
          genres={activeGenre.genres}
          onReturnBack={() => setActiveGenre(null)}
          onClose={onClose}
        />
      )}
    </>
  );
}
