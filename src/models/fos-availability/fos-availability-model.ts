import {
  IKosDataModel,
  IKosModelContainer,
  IKosVisitor,
  Kos,
  KosLog,
  KosModelContainer,
  kosAction,
  kosModel,
  kosTopicHandler,
} from "@coca-cola/kos-ui-core";
import {
  FosAvailabilityBeverage,
  FosAvailabilityBeverageModel,
} from "../fos-availability-beverage";
import { FosAvailabilityChangeResponse, getFosAvailability } from "./services";
import { FosAvailabilityModel, FosAvailabilityOptions } from "./types";

const MODEL_TYPE = "fos-availability-model";

const log = KosLog.getLogger("fos-availability-model");

/**
 * @class
 * @since Jun-04-23
 * @author Mark Pomerant (mapomerant@coca-cola.com)
 * @category Core
 * @subcategory Models
 * @description
 * FosAvailabilityModel is a data model that represents the state of beverage availability.
 * It will listen for availability changes from FOS and update the availability of each beverage.
 * **/
@kosModel<FosAvailabilityModel, FosAvailabilityOptions>(MODEL_TYPE)
class FosAvailabilityModelImpl implements FosAvailabilityModel {
  id: string;
  index: IKosModelContainer<FosAvailabilityBeverageModel>;

  constructor(modelId: string, options: FosAvailabilityOptions) {
    log.debug(`creating fos availability ${modelId} with options ${options}`);
    this.id = modelId;
    this.index = new KosModelContainer<FosAvailabilityBeverageModel>();
  }

  updateModel(options: FosAvailabilityOptions): void {
    // Update model properties here.
    log.debug(`updating fos availability ${this.id} with options ${options}`);
  }

  getAvailability(id: string) {
    return this.index.getModel(id) || { available: false };
  }
  // -------------------LIFECYCLE----------------------------

  async init(): Promise<void> {
    log.debug(`initializing fos availability ${this.id}`);
  }

  async load(): Promise<void> {
    log.debug(`loading fos availability ${this.id}`);
    try {
      const response = await getFosAvailability();
      log.debug(`received response ${response}`);

      kosAction(() => {
        if (response?.data) {
          response?.data.forEach((beverage) => {
            const id = beverage.beverage.id;
            const availableModel = FosAvailabilityBeverage.factory(
              `availability-${id}`
            )({
              available: beverage.available,
              visible: beverage.visible,
            });
            this.index.addModel(availableModel);
          });
        }
      });
    } catch (e) {
      log.error(e);
      throw e;
    }
  }
  /**
   * @method
   * @since Jun-04-23
   * @description
   * Topic handler that will be called whenever beverage availability changes.
   * **/
  @kosTopicHandler({
    topic: "/dispenser/beverages/availability",
    websocket: true,
    fos: true,
  })
  handleAvailabilityUpdate(availability: FosAvailabilityChangeResponse) {
    kosAction(() => {
      Object.values(availability.changes).forEach((beverage) => {
        const id = beverage.beverage.id;
        const availableModel = this.index.getModel(`availability-${id}`);
        if (availableModel) {
          availableModel.updateModel({
            available: beverage.available,
            visible: beverage.visible,
          });
        }
      });
    });
  }

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
      class: FosAvailabilityModelImpl,
      singleton: true,
    },
  },
  type: MODEL_TYPE,
  factory: Kos.Factory.create<FosAvailabilityModel, FosAvailabilityOptions>(
    MODEL_TYPE
  ),
};
export default Registration;
