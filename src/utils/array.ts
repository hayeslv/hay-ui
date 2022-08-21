type Many<T> = T | ReadonlyArray<T>;

export const ensureArray = <T>(arr: Many<T>): T[] => {
  if (!arr && (arr as any) !== 0) return [];
  return Array.isArray(arr) ? arr : [arr];
};
