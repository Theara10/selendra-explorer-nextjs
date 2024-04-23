import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export function map<T, U>(x: T | undefined, f: (y: T) => U): U | undefined {
  return x !== undefined && x !== null ? f(x) : (x as any);
}
export function map_or<T, U>(x: T | undefined, def: U, f: (y: T) => U): U {
  return x === undefined && x !== null ? def : f(x);
}

export function mapped<T>(
  x: T | undefined,
  f: (y: T) => undefined
): T | undefined {
  return map(x, (y) => {
    f(y);
    return y;
  });
}

function or_else<T>(t: T | undefined, f: () => T | undefined): T | undefined {
  return t === undefined ? f() : t;
}

/** selects the first loaded option */
export function select<T>(data: [T | undefined]): T | undefined {
  for (var x of data) {
    if (x === undefined || x === null) {
      continue;
    } else {
      return x!;
    }
  }
}
