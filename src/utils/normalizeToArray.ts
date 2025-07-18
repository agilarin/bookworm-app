export function normalizeToArray(
  value?: string | string[]
): string[] | undefined {
  if (!value) return undefined;
  return Array.isArray(value) ? value : [value];
}
