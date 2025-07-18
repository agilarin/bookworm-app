"use server";

import { firestoreAdmin } from "../firebaseAdmin";
import { CartType } from "@/types";
import { CARTS_COLLECTION } from "@/constants";
import { cartSchema } from "@/schemas/cart";
import { parseCartFromDoc } from "@/utils/parsers/cartParsers";

const cartsRef = firestoreAdmin.collection(CARTS_COLLECTION);

export async function saveCart(userId: string, data: CartType) {
  try {
    const parsed = cartSchema.safeParse(data);

    if (!parsed.success) {
      const issues = parsed.error.issues
        .map((e) => `${e.path.join(".")} - ${e.message}`)
        .join("; ");
      throw new Error(`Cart validation error: ${issues}`);
    }

    await cartsRef.doc(userId).set(parsed.data);
  } catch (error) {
    console.error("Failed to save cart:", error);
    throw error;
  }
}

export async function getCart(userId: string): Promise<CartType> {
  try {
    const cartSnap = await cartsRef.doc(userId).get();

    if (!cartSnap.exists) {
      return { items: [] };
    }

    return parseCartFromDoc(cartSnap) || { items: [] };
  } catch (error) {
    console.error("Failed to get cart:", error);
    throw error;
  }
}
