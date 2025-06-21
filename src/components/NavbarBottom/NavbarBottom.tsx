"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GenreType } from "@/types";
import BottomNavigation from "@mui/material/BottomNavigation";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { BurgerMenuMobile } from "../BurgerMenuMobile";
import { MediaQuery } from "../MediaQuery";
import * as S from "./NavbarBottom.styles";

interface NavbarBottomProps {
  genreList: GenreType[];
}

export function NavbarBottom({ genreList = [] }: NavbarBottomProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleClose = () => setOpen(false);

  return (
    <MediaQuery maxWidth="md">
      <BottomNavigation
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: open ? 1350 : 1000,
          boxShadow: "0 4px 20px rgba(0, 0, 0, .08)",
        }}
        showLabels
        value={true}
      >
        <S.NavButton
          label="Главная"
          value={pathname === "/"}
          icon={<HomeOutlinedIcon />}
          component={Link}
          href="/"
          onClick={handleClose}
        />
        <S.NavButton
          label="Каталог"
          value={open}
          icon={<ManageSearchRoundedIcon />}
          onClick={() => setOpen(!open)}
        />
        <S.NavButton
          label="Карзина"
          value={pathname === "/cart" && !open}
          icon={<ShoppingBasketOutlinedIcon />}
          component={Link}
          href="/cart"
          onClick={handleClose}
        />
        <BurgerMenuMobile
          genreList={genreList}
          open={open}
          onClose={handleClose}
        />
      </BottomNavigation>
    </MediaQuery>
  );
}
