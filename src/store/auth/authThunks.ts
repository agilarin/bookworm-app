import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as _signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { deleteSession, createOrRefreshSession } from "@/lib/api/session";
import { clearCart } from "../cart";

export interface SignUpParams {
  email: string;
  password: string;
  username: string;
}

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, username }: SignUpParams, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      const idToken = await user.getIdToken();
      await createOrRefreshSession(idToken);

      return {
        uid: user.uid,
        email: user.email,
        username: user.displayName ?? "",
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Ошибка регистрации");
    }
  }
);

export interface SignInParams {
  email: string;
  password: string;
}

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }: SignInParams, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const idToken = await user.getIdToken();
      await createOrRefreshSession(idToken);

      return {
        uid: user.uid,
        email: user.email,
        username: user.displayName ?? "",
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Ошибка входа");
    }
  }
);

export const signOut = createAsyncThunk("auth/signOut", async (_, thunkAPI) => {
  try {
    await _signOut(auth);
    await deleteSession();
    thunkAPI.dispatch(clearCart());
    return null;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || "Ошибка выхода");
  }
});

export type HandleAuthChangeParams = User | null;

export const handleAuthChange = createAsyncThunk(
  "auth/handleAuthChange",
  async (user: HandleAuthChangeParams, thunkAPI) => {
    if (!user) {
      return null;
    }

    try {
      const idToken = await user.getIdToken();
      await createOrRefreshSession(idToken);

      return {
        uid: user.uid,
        email: user.email,
        username: user.displayName ?? "",
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Не удалось обновить сессию");
    }
  }
);
