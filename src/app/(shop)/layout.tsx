import Stack from "@mui/material/Stack";
import { getGenresList } from "@/lib/firebase/genres";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NavbarBottom } from "@/components/NavbarBottom";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const genresList = await getGenresList();

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
      <NavbarBottom genreList={genresList || []} />
    </Stack>
  );
}
