import { FosSelectAndPourModel } from '@kos-ui/tfa-sample-app-model';
import { useFosSelectAndPour } from './use-fos-select-and-pour';

// react HOC to provide a FosBrand to a component

interface Props {
  fosSelectAndPour: FosSelectAndPourModel;
}
export function withFosSelectAndPour<T extends Props>(
  WrappedComponent: React.ComponentType<T>
) {
  return (props: Omit<T, keyof Props>) => {
    const { model, status, KosModelLoader } = useFosSelectAndPour();

    return (
      <KosModelLoader {...status}>
        <WrappedComponent {...(props as T)} fosSelectAndPour={model} />
      </KosModelLoader>
    );
  };
}
