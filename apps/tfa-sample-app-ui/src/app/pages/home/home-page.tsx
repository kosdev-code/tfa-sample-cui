import {
  VirtualRoute,
  VirtualRouter,
} from '../../components/virtual-router/virtual-router';
import { RouterProvider } from '../../contexts/virtual-router-context';

import { FosBeveragePage } from '../fos-beverage/fos-beverage-page';
import FosBrandPage from '../fos-brand-page/fos-brand-page';
import { Glass } from '../../components/glass';
import { FosSelectAndPourProvider } from '../../contexts/fos-select-and-pour-context';
import {
  ErrorBoundaryWithFallback,
  kosComponent,
} from '@kosdev-code/kos-ui-sdk';

const HomePageComponent = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'minMax(200px, auto) minMax(200px, 300px)',
      marginTop: '150px',
    }}
  >
    <div id="leftContainer">
      <ErrorBoundaryWithFallback>
        <FosSelectAndPourProvider>
          <RouterProvider position="left">
            <VirtualRouter>
              <VirtualRoute index component={<FosBrandPage />} />

              <VirtualRoute
                path="beverage/{:id}"
                component={<FosBeveragePage />}
              />
            </VirtualRouter>
          </RouterProvider>
        </FosSelectAndPourProvider>
      </ErrorBoundaryWithFallback>
    </div>

    <div
      id="virtual-glass"
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
        borderInlineStart: 'solid black 1px',
      }}
    >
      <h2>Virtual Glass</h2>
      <Glass></Glass>
    </div>
  </div>
);

export default kosComponent(HomePageComponent);
