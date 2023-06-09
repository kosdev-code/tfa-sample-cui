import { useKosModel } from "@coca-cola/kos-ui-components";

import { FosBrand, FosBrandModel } from "../../models/fos-brand";

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
