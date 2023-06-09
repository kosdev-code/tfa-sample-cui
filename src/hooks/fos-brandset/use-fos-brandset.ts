import { useKosModel } from "@coca-cola/kos-ui-components";

import {
  FosBrandset,
  FosBrandsetModel,
  FosBrandsetOptions,
} from "../../models/fos-brandset";

export const useFosBrandset = () => {
  const result = useKosModel<FosBrandsetModel, FosBrandsetOptions>({
    modelId: FosBrandset.type,
    modelType: FosBrandset.type,
    options: {},
  });

  return result;
};
