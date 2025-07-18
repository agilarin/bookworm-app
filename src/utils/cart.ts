import { CartItemType } from "@/types";

export function addItemToCartItems(items: CartItemType[], item: CartItemType) {
  const newItems = [...items];
  const index = newItems.findIndex(({ bookId }) => bookId === item.bookId);

  if (index > -1) {
    newItems[index] = {
      ...newItems[index],
      quantity: Math.max(newItems[index].quantity + item.quantity, 1),
    };
  } else {
    newItems.push({ ...item, quantity: Math.max(item.quantity, 1) });
  }

  return newItems;
}

export function removeItemFromCartItems(items: CartItemType[], bookId: string) {
  return [...items].filter((item) => item.bookId !== bookId);
}

export function updateItemInCartItems(
  items: CartItemType[],
  item: CartItemType
) {
  const newItems = [...items];
  const index = newItems.findIndex(({ bookId }) => bookId === item.bookId);

  if (index === -1) return newItems;

  const newItem = { ...newItems[index] };

  if (item.quantity !== undefined) {
    newItem.quantity = Math.max(item.quantity, 1);
  }
  newItems[index] = newItem;

  return newItems;
}
