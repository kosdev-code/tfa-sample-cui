import { IKosDataModel } from "@coca-cola/kos-ui-core";

export interface FosBrandOptions {
  name: string;
  icon: string;
  carbonated: boolean;
  lowCalorie: boolean;
  caffeineFree: boolean;
  available: boolean;
  backgroundImage: string;
  cuiVisible: boolean;
  clusterId;
  position: {
    clusterId: string;
    index: number;
    locked: boolean;
  };
}

export interface FosBrandModel extends FosBrandOptions, IKosDataModel {
  id: string;
  beverages: IKosModelContainer<FosBeverageModel>;
  updateModel(options: FosBrandOptions): void;
  visible: boolean;
  available: boolean;
}
