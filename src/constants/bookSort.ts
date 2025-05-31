import { OrderByDirection } from "firebase/firestore";
import { BooksSortFieldValues } from "@/types";

export const BOOK_SORT_ARRAY: { name: string; value: BooksSortFieldValues }[] =
  [
    { name: "По популярности", value: "popularDesc" },
    { name: "По рейтингу", value: "ratingDesc" },
    { name: "Сначала дешевые", value: "priceAsc" },
    { name: "Сначала дорогие", value: "priceDesc" },
  ];

export const BOOK_SORT_QUERY_MAP: {
  [k in BooksSortFieldValues]: [string, OrderByDirection];
} = {
  popularDesc: ["ratingCount", "desc"],
  ratingDesc: ["ratingValue", "desc"],
  priceAsc: ["price", "asc"],
  priceDesc: ["price", "desc"],
};
