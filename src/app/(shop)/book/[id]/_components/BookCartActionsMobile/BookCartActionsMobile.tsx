"use client";

import Fab from "@mui/material/Fab";

import { addCartItem } from "@/store";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { MediaQuery } from "@/components/MediaQuery";

interface BookCartActionsMobileProps {
  bookId: string;
}

export function BookCartActionsMobile({ bookId }: BookCartActionsMobileProps) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (bookId) {
      dispatch(addCartItem({ bookId, quantity: 1 }));
    }
  };

  return (
    <MediaQuery maxWidth="md">
      <Fab
        variant="extended"
        color="primary"
        sx={{
          position: "fixed",
          bottom: 64,
          left: 8,
          right: 8,
        }}
        onClick={handleClick}
      >
        Добавить в карзину
      </Fab>
    </MediaQuery>
  );
}
