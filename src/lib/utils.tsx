import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export function map<T, U>(x: T | undefined, f: (y: T) => U): U | undefined {
  const res: any = x !== undefined ? f(x) : x
  return res;
}
export function map_or<T, U>(x: T | undefined, def: U, f: (y: T) => U): U {
  return x === undefined ? def : f(x)
}