import { ReactNode } from "react";
import { Outlet, ScrollRestoration } from "react-router";
import Stack from "@mui/material/Stack";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NavbarBottom } from "@/components/NavbarBottom";

export function Layout({ children }: { children?: ReactNode }) {
  return (
    <Stack
      minHeight="100vh"
      direction="column"
      paddingBottom={{ xs: "56px", md: 0 }}
    >
      <ScrollRestoration />
      <Header />

      <Stack
        component="main"
        flex={1}
        bgcolor={(theme) => ({
          xs: theme.palette.background.paper,
          md: "transparent",
        })}
      >
        {children ?? <Outlet />}
      </Stack>

      <Footer />
      <NavbarBottom />
    </Stack>
  );
}
