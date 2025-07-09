/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export interface Type<T> extends Function {
  new (...args: any[]): T;
}

export function isType(v: any): v is Type<any> {
  return typeof v === 'function';
}

export type Mutable<T extends { [x: string]: any }, K extends string> = {
  [P in K]: T[P];
};
