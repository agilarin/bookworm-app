const debounceByKeyTimers = new Map<string, NodeJS.Timeout>();

export function debounceByKey<T>(
  callback: () => Promise<T>,
  key: string,
  delay: number
): Promise<T> {
  return new Promise((resolve) => {
    if (debounceByKeyTimers.has(key)) {
      clearTimeout(debounceByKeyTimers.get(key)!);
    }

    const timer = setTimeout(async () => {
      debounceByKeyTimers.delete(key);
      const result = await callback();
      resolve(result);
    }, delay);

    debounceByKeyTimers.set(key, timer);
  });
}
