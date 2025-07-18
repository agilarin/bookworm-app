import { z } from "zod/v4";
import {
  cartItemSchema,
  cartSchema,
  cartItemWithBookSchema,
  cartWithBooksSchema,
} from "@/schemas/cart";

export type CartItemType = z.infer<typeof cartItemSchema>;
export type CartType = z.infer<typeof cartSchema>;

export type CartItemWithBookType = z.infer<typeof cartItemWithBookSchema>;
export type CartWithBooksType = z.infer<typeof cartWithBooksSchema>;
