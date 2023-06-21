import { IKosDataModel, IKosModelContainer } from "@kosdev-code/kos-ui-sdk";
import { FosBrandModel } from "../../fos-brand/types";

export interface FosBrandsetOptions {}

export interface FosBrandsetModel extends FosBrandsetOptions, IKosDataModel {
  id: string;
  brands: IKosModelContainer<FosBrandModel>;
  clusterBrands: FosBrandModel[][];
  updateModel(options: FosBrandsetOptions): void;
}
