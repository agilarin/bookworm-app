"use server";

import { revalidateTag } from "next/cache";

import { createBookReviewSchema } from "@/schemas/bookReviews";
import { CreateBookReviewParams } from "@/types";
import { getBookReviewsTagByBookId } from "@/constants";
import { createBookReview } from "../server/bookReviews";

export async function addBookReview(data: CreateBookReviewParams) {
  const parsedData = createBookReviewSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error(
      "Validation failed: " + JSON.stringify(parsedData.error.message)
    );
  }

  const reviewId = await createBookReview(parsedData.data);

  revalidateTag(getBookReviewsTagByBookId(data.bookId));

  return reviewId;
}
