export const isString = (value: any) => typeof value === "string";

export const isObject = (o: any) => Object.prototype.toString.call(o) === "[object Object]";

export const isArray = (a: any) => Object.prototype.toString.call(a) === "[object Array]";

export const isFunction = (f: any) => f instanceof Function;

export const isDate = (d: any) => d instanceof Date;
