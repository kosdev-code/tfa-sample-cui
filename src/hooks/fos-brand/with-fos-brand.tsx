import { FosBrandModel } from "../../models/fos-brand";
import { useFosBrand } from "./use-fos-brand";

// react HOC to provide a FosBrand to a component

interface Props {
  fosBrand: FosBrandModel;
}
export function withFosBrand<T extends Props>(
  WrappedComponent: React.ComponentType<T>,
  brandId: string
) {
  return (props: Omit<T, keyof Props>) => {
    const { model, status, KosModelLoader } = useFosBrand(brandId);

    return (
      <KosModelLoader {...status}>
        <WrappedComponent {...(props as T)} fosBrand={model} />
      </KosModelLoader>
    );
  };
}
