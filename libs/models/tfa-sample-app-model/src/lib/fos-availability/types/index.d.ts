import { IKosDataModel } from "@kosdev-code/kos-ui-sdk";

export interface FosAvailabilityOptions {}

export interface FosAvailabilityModel
  extends FosAvailabilityOptions,
    IKosDataModel {
  id: string;
  updateModel(options: FosAvailabilityOptions): void;
  index: IKosModelContainer<IAvailabilityBeverage>;
  getAvailability: (id: string) => { available: boolean };
}
