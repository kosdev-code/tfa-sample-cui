import {FosSelectAndPourModel, FosSelectAndPourOptions, FosSelectAndPour} from "@kos-ui/tfa-sample-app-model";
import {useKosModel} from "@kosdev-code/kos-ui-sdk";

export const useFosSelectAndPour = () => {
  const result = useKosModel<FosSelectAndPourModel, FosSelectAndPourOptions>({
    modelType: FosSelectAndPour.type,
    modelId: FosSelectAndPour.type,
    options: {},
  });

  return result;
};
