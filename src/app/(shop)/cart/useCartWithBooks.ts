import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { CartType, CartWithBooksType } from "@/types";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectCart, selectCartLoading } from "@/store";
import { getCartBooks } from "@/lib/actions/cart";

type UseCartWithBooksReturn = {
  cart: CartType;
  cartWithBooks: CartWithBooksType;
  isLoading: boolean;
};

export function useCartWithBooks(): UseCartWithBooksReturn {
  const cart = useAppSelector(selectCart);
  const cartLoading = useAppSelector(selectCartLoading);
  const [isLoading, setIsLoading] = useState(true);

  const cartBookIds = useMemo(
    () => cart.items.map(({ bookId }) => bookId),
    [cart.items]
  );

  const { data: books, isLoading: booksIsLoading } = useQuery({
    queryKey: ["cartItems", cartBookIds],
    queryFn: () => getCartBooks(cartBookIds),
    enabled: !!cart.items.length,
    placeholderData: (prevData) => prevData,
  });

  const cartWithBooks: CartWithBooksType = useMemo(() => {
    if (!books?.length) return { ...cart, items: [] };

    const booksMap = new Map(books.map((item) => [item.id, item]));

    const items = cart.items.flatMap((item) => {
      const book = booksMap.get(item.bookId);
      return book ? [{ ...item, book }] : [];
    });

    return { ...cart, items };
  }, [cart.items, books]);

  useEffect(() => {
    if (!isLoading || cartLoading) return;

    if (
      (!booksIsLoading && !books?.length) ||
      (!booksIsLoading && cartWithBooks.items.length)
    ) {
      return setIsLoading(false);
    }
  }, [booksIsLoading, cartWithBooks, cartLoading]);

  return {
    cart,
    cartWithBooks,
    isLoading,
  };
}
