import { useState } from "react";
import { generatePath, Link, useMatch } from "react-router";
import { BottomNavigation, useMediaQuery } from "@mui/material";
import { ROUTES_PATHS } from "@/constants";
import { BurgerMenuMobile } from "../BurgerMenuMobile";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import * as S from "./NavbarBottom.styles";

export function NavbarBottom() {
  const [open, setOpen] = useState(false);
  const isUpMD = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const rootValue = !!useMatch(ROUTES_PATHS.ROOT);
  const catalogValue = !!useMatch(ROUTES_PATHS.CATALOG);
  const cartValue = !!useMatch(ROUTES_PATHS.CART);

  const handleClose = () => setOpen(false);

  if (isUpMD) {
    return null;
  }

  return (
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
        value={rootValue && !open}
        icon={<HomeOutlinedIcon />}
        component={Link}
        to={generatePath(ROUTES_PATHS.ROOT)}
        onClick={handleClose}
      />
      <S.NavButton
        label="Каталог"
        value={catalogValue || open}
        icon={<ManageSearchRoundedIcon />}
        onClick={() => setOpen(!open)}
      />
      <S.NavButton
        label="Карзина"
        value={cartValue && !open}
        icon={<ShoppingBasketOutlinedIcon />}
        component={Link}
        to={generatePath(ROUTES_PATHS.CART)}
        onClick={handleClose}
      />
      <BurgerMenuMobile
        open={open}
        onClose={handleClose}
      />
    </BottomNavigation>
  );
}
