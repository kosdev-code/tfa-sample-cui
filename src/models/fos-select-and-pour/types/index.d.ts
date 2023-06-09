import { IKosDataModel } from "@coca-cola/kos-ui-core";
import { FosBeverageModel } from "../../fos-beverage";

export enum PourStatus {
  IDLE = "idle",
  POURING = "pouring",
}
export interface FosSelectAndPourOptions {}

export interface FosSelectAndPourModel
  extends FosSelectAndPourOptions,
    IKosDataModel {
  id: string;
  updateModel(options: FosSelectAndPourOptions): void;
  setSelectedBeverage(beverageId?: string): void;
  selectedBeverageId?: string;
  selectedBeverage?: FosBeverageModel;
  start: () => Promise<void>;
  stop: () => Promise<void>;
  isPouring: boolean;
}
