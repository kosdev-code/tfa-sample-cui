import './app.css';
import {
  ErrorBoundaryWithFallback,
  initKosProvider,
  LoadingMessage,
  getLogLevel,
} from '@kosdev-code/kos-ui-sdk';
import log from 'loglevel';
import { Suspense } from 'react';
import { Registry } from '../registration';
import HomePage from './pages/home/home-page';

const level = getLogLevel();

log.setLevel(level);

const { KosCoreContextProvider } = initKosProvider(Registry);

const App = () => (
  <ErrorBoundaryWithFallback>
    <Suspense fallback={<LoadingMessage></LoadingMessage>}>
      <KosCoreContextProvider>
        <div className="App">
          <HomePage></HomePage>
        </div>
      </KosCoreContextProvider>
    </Suspense>
  </ErrorBoundaryWithFallback>
);

export default App;
