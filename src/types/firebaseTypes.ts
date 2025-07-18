import {
  DocumentSnapshot as DocumentSnapshotAdmin,
  QuerySnapshot as QuerySnapshotAdmin,
} from "firebase-admin/firestore";
import { DocumentSnapshot, QuerySnapshot } from "firebase/firestore";

export type FirestoreDocumentSnapshot =
  | DocumentSnapshot
  | DocumentSnapshotAdmin;

export type FirestoreQuerySnapshot = QuerySnapshot | QuerySnapshotAdmin;
