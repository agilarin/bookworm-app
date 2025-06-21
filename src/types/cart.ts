import { FieldValue } from "firebase-admin/firestore";
import { BookType } from "./book";

export type CartItemType = {
  bookId: string;
  quantity: number;
  book?: BookType;
};

export type CartType = {
  userId?: string;
  sessionId?: string;
  items: CartItemType[];
  createdAt?: FieldValue;
  updatedAt?: FieldValue;
  expireAt?: FieldValue;
};
