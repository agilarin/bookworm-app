"use client";

import { useState } from "react";
import Stack from "@mui/material/Stack";

import { GenreMenuType, GenreType } from "@/types";
import { BurgerMenuMobileHeader } from "../BurgerMenuMobileHeader";
import { BurgerMenuItem } from "@/components/UI/BurgerMenuItem";

interface BurgerMenuMobileContentProps {
  onReturnBack: () => void;
  onClose: () => void;
  title: string;
  items: GenreMenuType[] | GenreType[];
}

export function BurgerMenuMobileContent({
  onReturnBack,
  onClose,
  items,
  title,
}: BurgerMenuMobileContentProps) {
  const [activeItem, setActiveItem] = useState<GenreMenuType | null>(null);

  const handleClick = (item: GenreMenuType | GenreType) => {
    if ("genres" in item) {
      setActiveItem(item);
    } else {
      onClose();
    }
  };

  return (
    <>
      {!activeItem?.genres && (
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
            {items?.map((item) => (
              <BurgerMenuItem
                onClick={() => handleClick(item)}
                key={item.id}
                item={item}
                isLink={!("genres" in item)}
              />
            ))}
          </Stack>
        </Stack>
      )}

      {activeItem?.genres && (
        <BurgerMenuMobileContent
          title={activeItem.name}
          items={activeItem.genres}
          onReturnBack={() => setActiveItem(null)}
          onClose={onClose}
        />
      )}
    </>
  );
}
