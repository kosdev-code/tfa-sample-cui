import { IKosDataModel } from "@kosdev-code/kos-ui-sdk";

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
