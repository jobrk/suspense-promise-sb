import {createContext, useContext} from 'react';

const SuspensePromiseContext = createContext<WeakMap<
  Promise<any>,
  {settled: false; value: null} | {settled: true; value: any}
> | null>(null);

export const SuspensePromiseProvider = SuspensePromiseContext.Provider;

export function useSuspensePromise<T>(promise: Promise<T>): T {
  const promiseContext = useContext(SuspensePromiseContext);
  if (promiseContext == null)
    throw new Error(
      'useSuspensePromise called outside of SuspensePromiseProvider',
    );

  const promiseState = promiseContext.get(promise);
  if (promiseState == null) {
    promiseContext.set(promise, {settled: false, value: null});
    throw promise.then(value => {
      promiseContext.set(promise, {settled: true, value});
    });
  } else if (promiseState.settled) {
    return promiseState.value;
  } else {
    throw new Error(
      'should not render after promise has been thrown, and before promise is settled',
    );
  }
}
