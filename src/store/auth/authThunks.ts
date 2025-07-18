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
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Ошибка регистрации";
      return thunkAPI.rejectWithValue(errorMessage);
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
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Ошибка входа";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const signOut = createAsyncThunk("auth/signOut", async (_, thunkAPI) => {
  try {
    await _signOut(auth);
    await deleteSession();
    thunkAPI.dispatch(clearCart());
    return null;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Ошибка выхода";
    return thunkAPI.rejectWithValue(errorMessage);
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
      const errorMessage =
        error instanceof Error ? error.message : "Не удалось обновить сессию";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
