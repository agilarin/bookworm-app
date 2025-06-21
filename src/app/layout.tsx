import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import { theme } from "@/styles/theme";
import { Roboto } from "next/font/google";

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
  return (
    <html lang="ru">
      <body className={roboto.variable}>
        <StoreProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <ReactQueryProvider>
                <CssBaseline />
                {children}
              </ReactQueryProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
