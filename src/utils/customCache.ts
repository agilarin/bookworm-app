import { unstable_cache } from "next/cache";

function normalizeToKeyParts<P>(value: P): KeyParts {
  if (typeof value === "function" || typeof value === "undefined") return [];
  if (value == null) return [null];
  if (typeof value !== "object") return [value];

  if (Array.isArray(value)) {
    return value.flatMap(normalizeToKeyParts);
  }
  const sortedKeys = Object.keys(value).sort();
  return sortedKeys.flatMap((key) => [
    key,
    ...normalizeToKeyParts((value as Record<string, unknown>)[key]),
  ]);
}

function keyPartsToStringArray(keyParts: KeyParts): string[] {
  return keyParts
    .filter((key) => key !== undefined)
    .map((key) => (key === null ? "null" : String(key)));
}

type CacheOptions<P> = {
  tags?: (params: P) => string[];
  revalidate?: false | number;
};

type KeyParts = (string | number | null | boolean | object)[];

type getKeyParts<P> = (params: P) => KeyParts;

export function customCache<P, R>(
  fn: (params: P) => Promise<R>,
  keyParts: undefined | KeyParts | getKeyParts<P>,
  options: CacheOptions<P>
) {
  return (params: P): Promise<R> => {
    let rawCacheKey: KeyParts;
    if (typeof keyParts === "function") {
      rawCacheKey = [...normalizeToKeyParts(keyParts(params)), fn.toString()];
    } else if (Array.isArray(keyParts)) {
      rawCacheKey = [...normalizeToKeyParts(keyParts), fn.toString()];
    } else {
      rawCacheKey = [...normalizeToKeyParts(params), fn.toString()];
    }

    const cachedFn = unstable_cache(
      () => fn(params),
      keyPartsToStringArray(rawCacheKey),
      {
        tags: options.tags ? options.tags(params) : [],
        revalidate: options.revalidate ?? false,
      }
    );

    return cachedFn();
  };
}
