"use client";

import {
  // AuthState,
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
// import { UnwrapThunkDispatchReturn } from "@/types";
import { useCallback } from "react";

// type AuthActions = {
//   signUp: (
//     params: SignUpParams
//   ) => UnwrapThunkDispatchReturn<typeof signUpThunk>;
//   signIn: (
//     params: SignInParams
//   ) => UnwrapThunkDispatchReturn<typeof signInThunk>;
//   signOut: () => UnwrapThunkDispatchReturn<typeof signOutThunk>;
//   handleAuthChange: (
//     user: HandleAuthChangeParams
//   ) => UnwrapThunkDispatchReturn<typeof handleAuthChangeThunk>;
// };

// type UseAuthReturn = AuthState &
//   AuthActions & {
//     isAuth: boolean;
//   };

export function useAuth() {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const signUp = useCallback(
    (params: SignUpParams) => dispatch(signUpThunk(params)).unwrap(),
    [dispatch]
  );
  const signIn = useCallback(
    (params: SignInParams) => dispatch(signInThunk(params)).unwrap(),
    [dispatch]
  );
  const signOut = useCallback(
    () => dispatch(signOutThunk()).unwrap(),
    [dispatch]
  );
  const handleAuthChange = useCallback(
    (params: HandleAuthChangeParams) =>
      dispatch(handleAuthChangeThunk(params)).unwrap(),
    [dispatch]
  );

  return {
    ...auth,
    isAuth: !!auth.user?.uid,
    signUp,
    signIn,
    signOut,
    handleAuthChange,
  };
}
