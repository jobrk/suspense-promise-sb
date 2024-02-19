import {useSuspensePromise} from './lib';

interface AppProps {
  promise: Promise<string>;
}

export function App({promise}: AppProps) {
  const content = useSuspensePromise(promise);
  return <h1>{content}</h1>;
}
