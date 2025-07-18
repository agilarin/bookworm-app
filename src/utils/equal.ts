export function objectEqual<T extends object>(
  obj1?: T | null,
  obj2?: T | null
): boolean {
  if (obj1 === obj2) return true;
  if (!obj1 || !obj2) return false;

  const keys1 = Object.keys(obj1) as (keyof T)[];
  const keys2 = Object.keys(obj2) as (keyof T)[];
  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) return false;
  }

  return true;
}
