import { Link } from "react-router";
import { ROUTES_PATHS } from "@/constants";
import { useAppSelector } from "@/hooks/useAppSelector.ts";
import { selectCart } from "@/redux/cartSlice.ts";
import {
  Container,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { BurgerMenu } from "./components/BurgerMenu";
import { Search } from "./components/Search";
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import * as S from "./Header.styles.ts";

export function Header() {
  const isUpMD = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const cart = useAppSelector(selectCart);

  const cartTotal = cart.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <S.Root position="sticky">
      <Container>
        <Toolbar disableGutters>
          <Stack
            width="100%"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={{ xs: 2, md: 4 }}
          >
            {isUpMD && (
              <Stack
                flex={1}
                direction="row"
                alignItems="center"
                spacing={{ xs: 1, md: 3 }}
              >
                <Link to={ROUTES_PATHS.ROOT}>
                  <Typography
                    color="primary"
                    variant="h6"
                    component="span"
                  >
                    BookWorm
                  </Typography>
                </Link>
                <BurgerMenu />
              </Stack>
            )}

            <Search />

            {isUpMD && (
              <Stack
                flex={1}
                direction="row"
                justifyContent="flex-end"
                spacing={{ xs: 1, md: 2 }}
              >
                <S.Button
                  size="medium"
                  component={Link}
                  to={ROUTES_PATHS.CART}
                >
                  <S.Badge
                    badgeContent={cartTotal}
                    color="primary"
                    sx={{}}
                  >
                    <ShoppingBasketOutlinedIcon />
                  </S.Badge>
                </S.Button>
              </Stack>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </S.Root>
  );
}
