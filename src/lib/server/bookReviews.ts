"use server";

import { firestoreAdmin } from "../firebaseAdmin";
import { Timestamp } from "firebase-admin/firestore";
import { CreateBookReviewParams } from "@/types";
import { BOOKS_COLLECTION, BOOKS_REVIEWS_COLLECTION } from "@/constants";

const booksRef = firestoreAdmin.collection(BOOKS_COLLECTION);

export async function createBookReview(data: CreateBookReviewParams) {
  const bookReviewsRef = booksRef
    .doc(data.bookId)
    .collection(BOOKS_REVIEWS_COLLECTION);

  try {
    const reviewDoc = await bookReviewsRef.add({
      ...data,
      createdAt: Timestamp.now(),
    });

    return reviewDoc.id;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
