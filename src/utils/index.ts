export * from "./array";
export * from "./type";

export function isArray(o: any) {
  return Array.isArray(o);
}
export function isObject(o: any) {
  return Object.prototype.toString.call(o) === "[object Object]";
}

/**
 * 深拷贝
 * @param {*} o 要克隆的obj
 * @returns 克隆后的obj
 */
export function deepClone(o: any) {
  if (!isArray(o) && !isObject(o)) return o;

  const c: any = isArray(o) ? [] : {};
  for (const i in o) {
    if (isObject(o[i]) || isArray(o[i])) {
      c[i] = deepClone(o[i]);
    } else {
      c[i] = o[i];
    }
  }

  return c;
}
