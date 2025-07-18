"use server";

import { searchBooksByName } from "@/lib/server/books";

export async function searchBooks(searchTerm: string) {
  return searchBooksByName(searchTerm);
}
