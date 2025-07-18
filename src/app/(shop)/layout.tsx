import Stack from "@mui/material/Stack";
import { getGenreMenus } from "@/lib/server/genres";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NavbarBottom } from "@/components/layout/NavbarBottom";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const genreMenus = await getGenreMenus();

  return (
    <Stack
      minHeight="100vh"
      direction="column"
      paddingBottom={{ xs: "56px", md: 0 }}
    >
      <Header />

      <Stack
        component="main"
        flex={1}
        bgcolor={{
          xs: "background.paper",
          md: "transparent",
        }}
      >
        {children}
      </Stack>

      <Footer />
      <NavbarBottom genreMenus={genreMenus} />
    </Stack>
  );
}
