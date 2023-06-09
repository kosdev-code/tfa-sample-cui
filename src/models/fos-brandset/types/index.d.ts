import { IKosDataModel, IKosModelContainer } from "@coca-cola/kos-ui-core";
import { FosBrandModel } from "../../fos-brand/types";

export interface FosBrandsetOptions {}

export interface FosBrandsetModel extends FosBrandsetOptions, IKosDataModel {
  id: string;
  brands: IKosModelContainer<FosBrandModel>;
  clusterBrands: FosBrandModel[][];
  updateModel(options: FosBrandsetOptions): void;
}
