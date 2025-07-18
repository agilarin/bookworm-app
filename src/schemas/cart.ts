import * as z from "zod/v4";
import { bookSchema } from "./books";

export const cartItemSchema = z.object({
  bookId: z.string(),
  quantity: z.number(),
});

export const cartSchema = z.object({
  items: z.array(cartItemSchema),
});

export const cartItemWithBookSchema = cartItemSchema.extend({
  book: bookSchema,
});

export const cartWithBooksSchema = z.object({
  items: z.array(cartItemWithBookSchema),
});

// export const clientCartItemSchema = z.object({
//   bookId: z.string(),
//   quantity: z.number(),
//   book: bookSchema.optional(),
// });

// export const clientCartSchema = z.object({
//   items: z.array(clientCartItemSchema),
// });

// export const serverCartItemSchema = z.object({
//   bookId: z.string(),
//   quantity: z.number(),
// });

// export const serverCartSchema = z.object({
//   items: z.array(serverCartItemSchema),
// });
