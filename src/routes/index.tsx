import {
  createBrowserRouter,
  createHashRouter,
  RouteObject,
} from "react-router";
import { ROUTES_PATHS } from "@/constants";
import { Layout } from "@/components/Layout";
import { Home } from "@/pages/Home";
import { Catalog } from "@/pages/Catalog";
import { Book } from "@/pages/Book";
import { Cart } from "@/pages/Cart";

const routes: RouteObject[] = [
  {
    path: ROUTES_PATHS.ROOT,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTES_PATHS.CATALOG,
        element: <Catalog />,
      },
      {
        path: ROUTES_PATHS.BOOK,
        element: <Book />,
      },
      {
        path: ROUTES_PATHS.CART,
        element: <Cart />,
      },
    ],
  },
];

export const router = import.meta.env.DEV
  ? createBrowserRouter(routes)
  : createHashRouter(routes);
