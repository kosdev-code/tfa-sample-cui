import { IKosDataModel } from "@coca-cola/kos-ui-core";

export interface FosAvailabilityOptions {}

export interface FosAvailabilityModel
  extends FosAvailabilityOptions,
    IKosDataModel {
  id: string;
  updateModel(options: FosAvailabilityOptions): void;
  index: IKosModelContainer<IAvailabilityBeverage>;
  getAvailability: (id: string) => { available: boolean };
}
