"use server";

import { BookType, CartItemType, CartType } from "@/types";
import { getCart, saveCart } from "../server/cart";
import { getBookById } from "../server/books";
import { verifySession } from "../server/auth";
import {
  addItemToCartItems,
  removeItemFromCartItems,
  updateItemInCartItems,
} from "@/utils/cart";

export async function saveCartAction(cart: CartType) {
  const decodedSession = await verifySession();

  // const parsedCart = cartSchema.safeParse(cart);

  // if (!parsedCart.success) {
  //   const issues = parsedCart.error.issues
  //     .map((e) => `${e.path.join(".")} - ${e.message}`)
  //     .join("; ");
  //   throw new Error(`Cart validation error: ${issues}`);
  // }

  try {
    await saveCart(decodedSession.uid, cart);
    return cart;
  } catch (err) {
    console.error("saveCartAction error:", err);
    throw new Error("Failed to save cart.");
  }
}

export async function getCartAction() {
  const decodedSession = await verifySession();

  return await getCart(decodedSession.uid);
}

export async function addItemToCartAction(item: CartItemType) {
  const decodedSession = await verifySession();
  const cart = await getCart(decodedSession.uid);

  cart.items = addItemToCartItems(cart.items, item);

  await saveCart(decodedSession.uid, cart);
  return cart;
}

export async function removeItemFromCartAction(bookId: string) {
  const decodedSession = await verifySession();
  const cart = await getCart(decodedSession.uid);

  cart.items = removeItemFromCartItems(cart.items, bookId);

  await saveCart(decodedSession.uid, cart);
  return cart;
}

export async function updateCartItemQuantityAction(params: CartItemType) {
  const decodedSession = await verifySession();
  const cart = await getCart(decodedSession.uid);

  cart.items = updateItemInCartItems(cart.items, params);

  await saveCart(decodedSession.uid, cart);
  return cart;
}

export async function getCartBooks(bookIds: string[]) {
  const books = await Promise.all(
    bookIds.map(async (bookId) => {
      try {
        return await getBookById(bookId);
      } catch {
        return null;
      }
    })
  );
  return books.filter(Boolean) as BookType[];
}
