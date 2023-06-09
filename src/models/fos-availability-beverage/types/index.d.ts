import { IKosDataModel } from "@coca-cola/kos-ui-core";

export interface FosAvailabilityBeverageOptions {
  available: boolean;
  visible: boolean;
}

export interface FosAvailabilityBeverageModel
  extends FosAvailabilityBeverageOptions,
    IKosDataModel {
  id: string;
  updateModel(options: FosAvailabilityBeverageOptions): void;
}
