import type { IKosRegistry } from "@kosdev-code/kos-ui-sdk";
import { CoreModels } from "@kosdev-code/kos-ui-sdk";
import { Dispenser, FosBrandset, FosSelectAndPour } from '@kos-ui/tfa-sample-app-model';

// ------- PREPEND IMPORTS --------

export const kosModels: IKosRegistry["models"] = {
  ...CoreModels,
  ...Dispenser.registration,
  ...FosBrandset.registration,
  ...FosSelectAndPour.registration,
}
export const Registry: IKosRegistry = {
    models: kosModels,
    preloadModels: [],
};