export type * from "./book.ts";
export type * from "./cart.ts";

export type GenerateMetadataProps<P = undefined, S = undefined> = {
  params: P;
  searchParams: S;
};
