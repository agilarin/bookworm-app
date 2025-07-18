import Link from "next/link";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { MediaQuery } from "@/components/MediaQuery";
import { getGenreMenus } from "@/lib/server/genres";
import { BurgerMenu } from "./components/BurgerMenu";
import { Search } from "./components/Search";
import { CartButton } from "./components/CartButton";
import { UserButton } from "./components/UserButton";
import * as S from "./Header.styles";

export async function Header() {
  const genreMenus = await getGenreMenus();

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
            <MediaQuery minWidth="md">
              <Stack
                flex={1}
                direction="row"
                alignItems="center"
                spacing={{ xs: 1, md: 3 }}
              >
                <Link href="/">
                  <Typography
                    color="primary"
                    variant="h6"
                    component="span"
                  >
                    BookWorm
                  </Typography>
                </Link>
                <BurgerMenu genreMenus={genreMenus} />
              </Stack>
            </MediaQuery>

            <Search />

            <MediaQuery minWidth="md">
              <Stack
                flex={1}
                direction="row"
                justifyContent="flex-end"
                gap={{ xs: 1, md: 2 }}
              >
                <CartButton />
                <UserButton />
              </Stack>
            </MediaQuery>
          </Stack>
        </Toolbar>
      </Container>
    </S.Root>
  );
}
