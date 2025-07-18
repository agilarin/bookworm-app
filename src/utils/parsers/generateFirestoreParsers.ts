import { ZodType } from "zod/v4";
import { FirestoreDocumentSnapshot, FirestoreQuerySnapshot } from "@/types";

export type FirestoreParsers<R> = {
  parseDoc: (snapshot: FirestoreDocumentSnapshot) => R | null;
  parseSnapshot: (snapshot: FirestoreQuerySnapshot) => R[];
};

export function generateFirestoreParsers<R>(
  name: string,
  schema: ZodType<R>
): FirestoreParsers<R> {
  function parseDoc(snapshot: FirestoreDocumentSnapshot): R | null {
    const data = { id: snapshot.id, ...snapshot.data() };
    const result = schema.safeParse(data);
    if (!result.success) {
      console.error(
        `${name} validation failed for doc id: ${snapshot.id}`,
        result.error,
        data
      );
      return null;
    }
    return result.data;
  }

  function parseSnapshot(snapshot: FirestoreQuerySnapshot): R[] {
    return snapshot.docs
      .map(parseDoc)
      .filter((item): item is R => item !== null);
  }

  return {
    parseDoc,
    parseSnapshot,
  };
}
