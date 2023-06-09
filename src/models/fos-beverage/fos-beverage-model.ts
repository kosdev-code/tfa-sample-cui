import {
  kosModel,
  KosLog,
  Kos,
  kosDependency,
  KOS_MODEL_ID,
} from "@coca-cola/kos-ui-core";
import type { IKosDataModel, IKosVisitor } from "@coca-cola/kos-ui-core";
import { FosBeverageModel, FosBeverageOptions } from "./types";
import {
  FosAvailabilityBeverage,
  FosAvailabilityBeverageModel,
} from "../fos-availability-beverage";
import {
  FosSelectAndPour,
  FosSelectAndPourModel,
} from "../fos-select-and-pour";

const MODEL_TYPE = "fos-beverage-model";

const log = KosLog.getLogger("fos-beverage-model");

/**
 * @class
 * @since Jun-04-23
 * @author Mark Pomerant (mapomerant@coca-cola.com)
 * @category Core
 * @subcategory Models
 * @description
 * FosBeverageModel is a data model that represents a beverage.
 * It is responsible for loading the FOS bundle that contains the beverage data.
 * @property {string} id - The unique identifier for this model.
 * @property {string} name - The name of this beverage.
 * @property {string} icon - The URL of the icon for this beverage.
 * @property {boolean} waveEnabled - Whether the wave animation is enabled for this beverage.
 * @property {string} mainFlavorColor - The main flavor color for this beverage.
 * @property {string} flavorName - The name of the flavor for this beverage.
 * @property {string} flavorFontColor - The font color for the flavor name.
 * @property {string} flavorTextAlignment - The text alignment for the flavor name.
 **/
@kosModel<FosBeverageModel, FosBeverageOptions>(MODEL_TYPE)
class FosBeverageModelImpl implements FosBeverageModel {
  @kosDependency({
    modelType: FosAvailabilityBeverage.type,
    id: `availability-${KOS_MODEL_ID}`,
  })
  beverageAvailability?: FosAvailabilityBeverageModel;

  @kosDependency({ modelType: FosSelectAndPour.type, options: {} })
  selectAndPourModel!: FosSelectAndPourModel;
  id: string;

  backgroundImage: string;
  lowCalorie: boolean;
  ringColor: string;

  waveEnabled: boolean;
  icon: string;
  name: string;
  flavorName: string;
  mainFlavorColor: string;
  flavorFontColor: string;
  flavorTextAlignment: string;
  constructor(modelId: string, options: FosBeverageOptions) {
    this.id = modelId;
    this.name = options.name;

    this.backgroundImage = options.backgroundImage;
    this.lowCalorie = options.lowCalorie;
    this.ringColor = options.ringColor;

    this.waveEnabled = options.waveEnabled;
    this.mainFlavorColor = options.mainFlavorColor;
    this.icon = options.icon;
    this.flavorName = options.flavorName;
    this.flavorFontColor = options.flavorFontColor;
    this.flavorTextAlignment = options.flavorTextAlignment;
  }

  /**
   *
   * @property {boolean} isSelected - Whether this beverage is selected.
   * @computed
   * @since Jun-04-23
   * @description
   * Derived value that depends on the selected beverage in the FosSelectAndPourModel.
   **/
  get isSelected() {
    return this.selectAndPourModel.selectedBeverageId === this.id;
  }

  /**
   * @method
   * @since Jun-04-23
   * @description
   * Set this beverage as the selected beverage in the FosSelectAndPourModel.
   **/
  setSelected() {
    this.selectAndPourModel.setSelectedBeverage(this.id);
  }

  updateModel(options: FosBeverageOptions): void {
    log.debug(`updating fos beverage ${this.id}: ${JSON.stringify(options)}`);
  }

  get available() {
    return !!this.beverageAvailability?.available;
  }

  get visible() {
    return !!this.beverageAvailability?.visible;
  }

  // -------------------LIFECYCLE----------------------------

  // -------------------ENTITY----------------------------

  accept(visitor: IKosVisitor<IKosDataModel>) {
    visitor.visit(this);
  }

  getChildren() {
    return [];
  }
}

const Registration = {
  registration: {
    [MODEL_TYPE]: {
      class: FosBeverageModelImpl,
      singleton: false,
    },
  },
  type: MODEL_TYPE,
  factory: Kos.Factory.create<FosBeverageModel, FosBeverageOptions>(MODEL_TYPE),
};
export default Registration;
