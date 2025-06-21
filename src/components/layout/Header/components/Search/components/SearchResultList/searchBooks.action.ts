"use server";

import { searchBooksByName } from "@/lib/firebase/books";

export async function searchBooks(searchTerm: string) {
  return searchBooksByName(searchTerm);
}
