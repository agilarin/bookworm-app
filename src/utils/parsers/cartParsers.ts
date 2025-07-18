import { cartSchema, cartItemSchema } from "@/schemas/cart";
import { generateFirestoreParsers } from "./generateFirestoreParsers";

export const {
  parseDoc: parseCartItemFromDoc,
  parseSnapshot: parseCartItemsFromSnapshot,
} = generateFirestoreParsers("Cart item", cartItemSchema);

export const { parseDoc: parseCartFromDoc } = generateFirestoreParsers(
  "Cart",
  cartSchema
);
