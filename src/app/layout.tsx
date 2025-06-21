import type { Metadata } from "next";
import { ThemeProvider, CssBaseline, Stack } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { getGenresList } from "@/lib/firebase/genres";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NavbarBottom } from "@/components/NavbarBottom";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import { theme } from "@/styles/theme";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "BookWorm - интернет магазин книг",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const genresList = await getGenresList();

  return (
    <html lang="ru">
      <body className={roboto.variable}>
        <StoreProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <ReactQueryProvider>
                <CssBaseline />
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
              </ReactQueryProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
