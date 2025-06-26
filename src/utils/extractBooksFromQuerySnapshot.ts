import { QuerySnapshot } from "firebase-admin/firestore";
import { BookType } from "@/types";

export function extractBooksFromQuerySnapshot(querySnap: QuerySnapshot) {
  return querySnap.docs.map(
    (snap) =>
      ({
        id: snap.id,
        ...snap.data(),
      } as BookType)
  );
}
