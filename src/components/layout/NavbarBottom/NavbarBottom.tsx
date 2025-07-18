"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BottomNavigation from "@mui/material/BottomNavigation";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { GenreMenuType } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { BurgerMenuMobile } from "@/components/BurgerMenuMobile";
import { MediaQuery } from "@/components/MediaQuery";
import { CartBadge } from "@/components/CartBadge";
import { useAuthModal } from "@/contexts/AuthModalContext";
import * as S from "./NavbarBottom.styles";

interface NavbarBottomProps {
  genreMenus: GenreMenuType[];
}

export function NavbarBottom({ genreMenus = [] }: NavbarBottomProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { signOut, isAuth } = useAuth();
  const { onToggle } = useAuthModal();

  const handleClose = () => setOpen(false);

  const getValue = () => {
    if (pathname === "/") return "home";
    if (pathname === "/cart") return "cart";
    if (open) return "catalog";
    return null;
  };

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
        value={getValue()}
      >
        <S.NavButton
          label="Главная"
          value="home"
          icon={<HomeOutlinedIcon />}
          component={Link}
          href="/"
          onClick={handleClose}
        />
        <S.NavButton
          label="Каталог"
          value="catalog"
          icon={<ManageSearchRoundedIcon />}
          onClick={() => setOpen(!open)}
        />
        <S.NavButton
          label="Карзина"
          value="cart"
          icon={<CartBadge />}
          component={Link}
          href="/cart"
          onClick={handleClose}
        />
        <S.NavButton
          label={isAuth ? "Выйти" : "Войти"}
          value="user"
          icon={isAuth ? <LogoutRoundedIcon /> : <AccountCircleOutlinedIcon />}
          component="button"
          onClick={isAuth ? signOut : onToggle}
        />
        <BurgerMenuMobile
          genreMenus={genreMenus}
          open={open}
          onClose={handleClose}
        />
      </BottomNavigation>
    </MediaQuery>
  );
}
