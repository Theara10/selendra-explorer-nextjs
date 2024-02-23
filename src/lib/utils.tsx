import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export function map<T, U>(x: T | undefined, f: (y: T) => U): U | undefined {
  const res: any = x !== undefined ? f(x) : x
  return res;
}