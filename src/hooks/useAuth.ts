"use client";

import {
  AuthState,
  selectAuth,
  signOut as signOutThunk,
  signUp as signUpThunk,
  signIn as signInThunk,
  handleAuthChange as handleAuthChangeThunk,
  SignInParams,
  SignUpParams,
  HandleAuthChangeParams,
} from "@/store";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { ThunkDispatchReturn } from "@/types";
import { useCallback } from "react";

type AuthActions = {
  signUp: (params: SignUpParams) => ThunkDispatchReturn<typeof signUpThunk>;
  signIn: (params: SignInParams) => ThunkDispatchReturn<typeof signInThunk>;
  signOut: () => ThunkDispatchReturn<typeof signOutThunk>;
  handleAuthChange: (
    user: HandleAuthChangeParams
  ) => ThunkDispatchReturn<typeof handleAuthChangeThunk>;
  signUpThunk: typeof signUpThunk;
  signInThunk: typeof signInThunk;
};

type UseAuthReturn = AuthState &
  AuthActions & {
    isAuth: boolean;
  };

export function useAuth(): UseAuthReturn {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const signUp = useCallback(
    (params: SignUpParams) => dispatch(signUpThunk(params)),
    [dispatch]
  );
  const signIn = useCallback(
    (params: SignInParams) => dispatch(signInThunk(params)),
    [dispatch]
  );
  const signOut = useCallback(() => dispatch(signOutThunk()), [dispatch]);
  const handleAuthChange = useCallback(
    (params: HandleAuthChangeParams) => dispatch(handleAuthChangeThunk(params)),
    [dispatch]
  );

  return {
    ...auth,
    isAuth: !!auth.user?.uid,
    signUp,
    signIn,
    signOut,
    handleAuthChange,
    signUpThunk,
    signInThunk,
  };
}
