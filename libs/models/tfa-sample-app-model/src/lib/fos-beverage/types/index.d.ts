import { IKosDataModel } from "@kosdev-code/kos-ui-sdk";

export interface FosBeverageOptions {
  backgroundImage: string;
  lowCalorie: boolean;
  ringColor: string;
  flavorName: string;
  mainFlavorColor: string;
  waveEnabled: boolean;
  icon: string;
  flavorFontColor: string;
  flavorTextAlignment: string;
  name: string;
}

export interface FosBeverageModel extends FosBeverageOptions, IKosDataModel {
  id: string;
  updateModel(options: FosBeverageOptions): void;
  setSelected(): void;
  available: boolean;
  visible: boolean;
  isSelected: boolean;
}
