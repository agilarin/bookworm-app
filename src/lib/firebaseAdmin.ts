import "server-only";

import {
  initializeApp,
  cert,
  getApps,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

function formatPrivateKey(key: string) {
  return key?.replace(/\\n/g, "\n");
}

const appName = "firebaseAdminApp";
const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY as string),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

const gettingAdminApp = getApps().find((app) => app.name === appName);

export const adminApp =
  gettingAdminApp ||
  initializeApp({ credential: cert(serviceAccount) }, appName);

export const firestoreAdmin = getFirestore(adminApp);
export const authAdmin = getAuth(adminApp);
