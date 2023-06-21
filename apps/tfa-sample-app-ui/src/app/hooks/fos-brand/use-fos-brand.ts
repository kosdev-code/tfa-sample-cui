import {FosBrandModel, FosBrand} from "@kos-ui/tfa-sample-app-model";
import {useKosModel} from "@kosdev-code/kos-ui-sdk";


/**
 * @hook
 * @param brandId
 * @returns - {FosBrandModel} - The FosBrandModel for the given brandId
 */
export const useFosBrand = (brandId: string) => {
  const result = useKosModel<FosBrandModel, FosBrandModel>({
    modelId: brandId,
    modelType: FosBrand.type,
  });

  return result;
};
