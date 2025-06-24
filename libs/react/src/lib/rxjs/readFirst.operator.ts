/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

export type ReadSelector<T> = (state: any) => T;

const NOOP: ReadSelector<any> = (s: any) => s;

/**
 * Quick util to read 1st value emitted from BehaviorSubject/replay streams
 */
export function readFirst<T>(
  source: Observable<any>,
  selector?: ReadSelector<T>,
): T {
  let result: T = '' as unknown as T;
  source?.pipe(first(), map(selector || NOOP)).subscribe((v) => (result = v));
  return result;
}

/**
 * For streams that will emit asynhronously
 */
export function readFirstAsync<T>(
  source: Observable<any>,
  selector?: ReadSelector<T>,
): Promise<T> {
  return Promise.resolve(readFirst(source, selector));
}
