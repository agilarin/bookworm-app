import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import { AppProviders } from "@/components/providers/AppProviders";
import { CartLoader } from "@/components/CartLoader";
import { AuthModal } from "@/components/AuthModal";

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
        <AppProviders>
          <CartLoader />
          {children}
          <AuthModal />
        </AppProviders>
      </body>
    </html>
  );
}
