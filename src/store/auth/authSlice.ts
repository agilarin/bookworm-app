import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { UserType } from "@/types";
import { RootState } from "../store";
import { handleAuthChange, signIn, signOut, signUp } from "./authThunks";
import { objectEqual } from "@/utils/equal";

export interface AuthState {
  user: UserType | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, authPending)
      .addCase(signUp.fulfilled, authFulfilled)
      .addCase(signUp.rejected, authRejected)

      .addCase(signIn.pending, authPending)
      .addCase(signIn.fulfilled, authFulfilled)
      .addCase(signIn.rejected, authRejected)

      .addCase(handleAuthChange.fulfilled, authFulfilled)
      .addCase(handleAuthChange.rejected, authRejected)

      .addCase(signOut.pending, (state) => {
        state.error = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(signOut.rejected, authRejected);
  },
});

function authPending(state: AuthState) {
  state.loading = true;
  state.error = null;
}
function authFulfilled(
  state: AuthState,
  { payload }: PayloadAction<UserType | null>
) {
  if (!objectEqual(state.user, payload)) {
    state.user = payload;
  }
  state.loading = false;
  state.error = null;
}
function authRejected(state: AuthState, { payload }: PayloadAction<unknown>) {
  state.loading = false;
  state.error = payload as string;
}

export const selectAuth = (state: RootState) => state.auth;
