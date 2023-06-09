import "./App.css";

import {
  ErrorBoundaryWithFallback,
  initKosProvider,
  LoadingMessage,
} from "@coca-cola/kos-ui-components";
import { getLogLevel, IKosRegistry } from "@coca-cola/kos-ui-core";
import log from "loglevel";
import { Suspense } from "react";

import { FosBrandset } from "./models/fos-brandset";
import HomePage from "./pages/home/home-page";
import { FosSelectAndPour } from "./models/fos-select-and-pour";

const level = getLogLevel();

log.setLevel(level);

// create an empty kOS model registry.
export const Registry: IKosRegistry = {
  models: {
    ...FosBrandset.registration,
    ...FosSelectAndPour.registration,
  },
  preloadModels: [FosSelectAndPour.type, FosBrandset.type],
};
const { KosCoreContextProvider } = initKosProvider(Registry);

const App = () => (
  <ErrorBoundaryWithFallback>
    <Suspense fallback={<LoadingMessage></LoadingMessage>}>
      <KosCoreContextProvider>
        <div className="App">
          <HomePage />
        </div>
      </KosCoreContextProvider>
    </Suspense>
  </ErrorBoundaryWithFallback>
);

export default App;
