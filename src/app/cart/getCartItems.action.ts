"use server";

import { getBooksById } from "@/lib/firebase/books";

export async function getCartItems(idArray: string[]) {
  return getBooksById(idArray);
}
