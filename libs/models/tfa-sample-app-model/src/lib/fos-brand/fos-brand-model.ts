import type { IKosDataModel, IKosVisitor } from "@kosdev-code/kos-ui-sdk";
import {
  IKosModelContainer,
  Kos,
  KosLog,
  KosModelContainer,
  kosModel,
} from "@kosdev-code/kos-ui-sdk";
import { FosBeverageModel } from "../fos-beverage";
import { FosBrandModel, FosBrandOptions } from "./types";

const MODEL_TYPE = "fos-brand-model";

const log = KosLog.getLogger("fos-brand-model");

/**
 * @class
 * @since Jun-04-23
 * @author Mark Pomerant (mapomerant@coca-cola.com)
 * @category Core
 * @subcategory Models
 * @description
 * FosBrandModel is a data model that represents a brand of beverages.
 * It is a container for FosBeverageModel instances and is responsible for
 * loading the FOS bundle that contains the brand data.
 * @property {string} id - The unique identifier for this model.
 * @property {string} name - The name of this brand.
 * @property {string} icon - The URL of the icon for this brand.
 * @property {boolean} carbonated - Whether this brand is carbonated.
 * @property {boolean} lowCalorie - Whether this brand is low calorie.
 * @property {boolean} caffeineFree - Whether this brand is caffeine free.
 * @property {boolean} cuiVisible - Whether this brand is visible in the CUI.
 * @property {string} backgroundImage - The URL of the background image for this brand.
 * @property {string} clusterId - The cluster ID for this brand.
 * @property {object} position - The position of this brand in the cluster.
 * @property {number} position.index - The index of this brand in the cluster.
 * @property {boolean} position.locked - Whether this brand is locked in the cluster.
 * @property {IKosModelContainer<FosBeverageModel>} beverages - A container for the
 * FosBeverageModel instances that are part of this brand.
 **/
@kosModel<FosBrandModel, FosBrandOptions>(MODEL_TYPE)
class FosBrandModelImpl implements FosBrandModel {
  id: string;
  name: string;
  icon: string;
  cuiVisible: boolean;
  carbonated: boolean;
  lowCalorie: boolean;
  caffeineFree: boolean;
  backgroundImage: string;
  clusterId: string;
  position: {
    clusterId: string;
    index: number;
    locked: boolean;
  };
  beverages: IKosModelContainer<FosBeverageModel>;
  constructor(modelId: string, options: FosBrandOptions) {
    log.debug(`creating fos brand ${modelId}`);
    this.id = modelId;
    this.name = options.name;
    this.icon = options.icon;
    this.carbonated = options.carbonated;
    this.caffeineFree = options.caffeineFree;
    this.lowCalorie = options.lowCalorie;

    this.backgroundImage = options.backgroundImage;
    this.position = options.position;
    this.clusterId = options.position.clusterId;
    this.cuiVisible = options.cuiVisible;
    Object.assign(this.position, options.position);
    this.beverages = new KosModelContainer<FosBeverageModel>();
  }

  updateModel(options: FosBrandOptions): void {
    this.name = options.name;
    this.icon = options.icon;
    this.carbonated = options.carbonated;
    this.caffeineFree = options.caffeineFree;
    this.lowCalorie = options.lowCalorie;

    this.backgroundImage = options.backgroundImage;
    Object.assign(this.position, options.position);
  }

  /**
   * @property {boolean} visible - Whether this brand is visible in the CUI.
   * @readonly
   * @since Jun-04-23
   * @computed
   * @description
   * Returns true if any of the beverages in this brand are visible.
   **/
  get visible() {
    return this.beverages.data.some((beverage) => beverage.visible);
  }

  /**
   * @property {boolean} available - Whether this brand is available to be poured.
   * @readonly
   * @since Jun-04-23
   * @computed
   * @description
   * Returns true if any of the beverages in this brand are available.
   **/
  get available() {
    return this.beverages.data.some((beverage) => beverage.available);
  }
  // -------------------LIFECYCLE----------------------------

  // -------------------ENTITY----------------------------

  accept(visitor: IKosVisitor<IKosDataModel>) {
    visitor.visit(this);
  }

  getChildren() {
    return [...this.beverages.data];
  }
}

const Registration = {
  registration: {
    [MODEL_TYPE]: {
      class: FosBrandModelImpl,
      singleton: false,
    },
  },
  type: MODEL_TYPE,
  factory: Kos.Factory.create<FosBrandModel, FosBrandOptions>(MODEL_TYPE),
};
export default Registration;
