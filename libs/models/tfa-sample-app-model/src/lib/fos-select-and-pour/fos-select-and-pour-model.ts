import {
  kosModel,
  KosLog,
  Kos,
  kosTopicHandler,
  KosModelFactory,
  kosAction,
} from "@kosdev-code/kos-ui-sdk";
import type { IKosDataModel, IKosVisitor } from "@kosdev-code/kos-ui-sdk";
import { FosSelectAndPourModel, FosSelectAndPourOptions } from "./types";
import {
  PourMessage,
  clearSelectedBeverage,
  selectBeverage,
  startPour,
  stopPour,
} from "./services/fos-select-and-pour-services";
import { FosBeverage, FosBeverageModel } from "../fos-beverage";

export enum PourStatus {
  IDLE = "idle",
  POURING = "pouring",
}
const MODEL_TYPE = "fos-select-and-pour-model";

const log = KosLog.getLogger("fos-select-and-pour-model");

/**
 * @class
 * @since Jun-04-23
 * @author Mark Pomerant (mapomerant@coca-cola.com)
 * @category Core
 * @subcategory Models
 * @description
 * The FosSelectAndPourModelImpl class implements the FosSelectAndPourModel interface.  It acts as a singleton model for the CUI.
 * It is responsible for managing the state beverage selection and pouring within the CUI for a dispenser.
 *
 * As users select beverages in the UI the model will update the selected beverage state and notify the backend of the change.
 *
 * When users start or stop pouring the model will notify the backend to start pouring the selected beverage.
 *
 * @property {string} id - The unique identifier for the model.
 *
 */
@kosModel<FosSelectAndPourModel, FosSelectAndPourOptions>(MODEL_TYPE)
class FosSelectAndPourModelImpl implements FosSelectAndPourModel {
  id: string;

  private _selectedBeverageId?: string;
  private pouring: PourStatus;
  constructor(modelId: string, options: FosSelectAndPourOptions) {
    log.debug(
      `constructing fos select and pour ${modelId} with options ${options} `
    );
    this.id = modelId;
    this._selectedBeverageId = undefined;
    this.pouring = PourStatus.IDLE;
  }

  updateModel(options: FosSelectAndPourOptions): void {
    log.debug(
      `updating fos select and pour ${this.id} with options ${options}`
    );
  }

  get selectedBeverage() {
    if (!this._selectedBeverageId) {
      return undefined;
    }
    const beverage = KosModelFactory.getModelInstance<FosBeverageModel>(
      this._selectedBeverageId,
      FosBeverage.type
    );

    return beverage;
  }
  get selectedBeverageId() {
    return this._selectedBeverageId;
  }
  async setSelectedBeverage(beverageId?: string) {
    if (!beverageId) {
      await clearSelectedBeverage();
    } else {
      await selectBeverage(beverageId);
    }
    kosAction(() => {
      this._selectedBeverageId = beverageId;
    });
  }

  get isPouring() {
    return this.pouring === PourStatus.POURING;
  }
  async start() {
    if (this.pouring === PourStatus.POURING) {
      return;
    }
    if (this._selectedBeverageId) {
      await startPour();
      kosAction(() => {
        this.pouring = PourStatus.POURING;
      });
    }
  }

  async stop() {
    if (this.pouring === PourStatus.IDLE) {
      return;
    }
    await stopPour();
    kosAction(() => {
      this.pouring = PourStatus.IDLE;
    });
  }

  // -------------------SUBSCRIPTIONS---------------------

  /**
   * @method
   * @since Jun-04-23
   * @description
   * This method is a subscription handler for the /dispenser/pour topic.  It will
   * update the pouring state of the model based on the message type.
   * @param {PourMessage} message - The message received from the backend.
   * @returns {void}
   **/
  @kosTopicHandler({ topic: "/dispenser/pour", fos: true, websocket: true })
  handlePourStatus(message: PourMessage) {
    if (message.type === "start") {
      this.pouring = PourStatus.POURING;
    } else {
      this.pouring = PourStatus.IDLE;
    }
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
      class: FosSelectAndPourModelImpl,
      singleton: true,
    },
  },
  type: MODEL_TYPE,
  factory: Kos.Factory.create<FosSelectAndPourModel, FosSelectAndPourOptions>(
    MODEL_TYPE
  ),
};
export default Registration;
