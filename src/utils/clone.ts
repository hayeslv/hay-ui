
export const deepClone = (target: any) =>  {
  const map = new WeakMap();

  const isObject = (target: any) => (typeof target === "object" && target !== null) || typeof target === "function";

  const clone = (data: any): any => {
    if (!isObject(data)) return data;
    if ([Date, RegExp].includes(data.constructor)) {
      return new data.constructor(data);
    }
    if (typeof data === "function") {
      return new Function("return " + data.toString())();
    }

    // 如果该对象已存在，则直接返回该对象
    const exist = map.get(data);
    if (exist) return exist;

    // 处理Array对象
    if (Array.isArray(data)) {
      const array = [];
      for (let i = 0; i < data.length; i++) {
        array.push(clone(data[i]));
      }
      return array;
    }

    if (data instanceof Map) {
      const result = new Map();
      map.set(data, result);
      data.forEach((value, key) => {
        if (isObject(value)) {
          result.set(key, clone(value));
        } else {
          result.set(key, value);
        }
      });
      return result;
    }

    if (data instanceof Set) {
      const result = new Set();
      map.set(data, result);
      data.forEach(value => {
        if (isObject(value)) {
          result.add(clone(value));
        } else {
          result.add(value);
        }
      });
      return result;
    }

    const keys = Reflect.ownKeys(data);
    const allDesc = Object.getOwnPropertyDescriptors(data);
    // 以data为原型（复制data的原型链），allDesc为描述，创建一个空对象
    const result = Object.create(Object.getPrototypeOf(data), allDesc);
    map.set(data, result);
    keys.forEach(key => {
      const value = data[key];
      if (isObject(value)) {
        result[key] = clone(value);
      } else {
        result[key] = value;
      }
    });

    return result;
  };

  return clone(target);
};
