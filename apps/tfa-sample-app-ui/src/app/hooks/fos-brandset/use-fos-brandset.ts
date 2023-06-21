import {FosBrandsetModel, FosBrandsetOptions, FosBrandset} from "@kos-ui/tfa-sample-app-model";
import {useKosModel} from "@kosdev-code/kos-ui-sdk";


export const useFosBrandset = () => {
  const result = useKosModel<FosBrandsetModel, FosBrandsetOptions>({
    modelId: FosBrandset.type,
    modelType: FosBrandset.type,
    options: {},
  });

  return result;
};
