import {createRoot} from 'react-dom/client';
import {App} from './App';
import {StrictMode, Suspense} from 'react';
import {SuspensePromiseProvider} from './lib';

const promise = wait(2000).then(() => 'Hello world!');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SuspensePromiseProvider value={new WeakMap()}>
      <Suspense fallback={<h1>Loading...</h1>}>
        <App promise={promise} />
      </Suspense>
    </SuspensePromiseProvider>
  </StrictMode>,
);

function wait(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}
