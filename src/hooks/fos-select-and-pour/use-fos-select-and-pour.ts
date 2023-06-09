import { useKosModel } from "@coca-cola/kos-ui-components";

import {
  FosSelectAndPour,
  FosSelectAndPourModel,
  FosSelectAndPourOptions,
} from "../../models/fos-select-and-pour";

export const useFosSelectAndPour = () => {
  const result = useKosModel<FosSelectAndPourModel, FosSelectAndPourOptions>({
    modelType: FosSelectAndPour.type,
    modelId: FosSelectAndPour.type,
    options: {},
  });

  return result;
};
