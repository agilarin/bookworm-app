// import { AsyncThunk } from "@reduxjs/toolkit/react";

export type * from "./bookTypes.js";
export type * from "./cartTypes.js";
export type * from "./authTypes.js";
export type * from "./firebaseTypes.js";

export type GenerateMetadataProps<P = undefined, S = undefined> = {
  params: P;
  searchParams: S;
};

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

// export type ThunkDispatchReturn<T extends (...args: any) => any> =
//   ReturnType<T> extends (...args: any) => infer R ? R : never;

// export type UnwrapThunkDispatchReturn<T> = T extends AsyncThunk<
//   infer Returned,
//   infer _Arg,
//   infer _Config
// >
//   ? Promise<Returned>
//   : never;
