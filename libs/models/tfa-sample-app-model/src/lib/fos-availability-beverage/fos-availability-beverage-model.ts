import type { IKosDataModel, IKosVisitor } from "@kosdev-code/kos-ui-sdk";
import { Kos, kosModel } from "@kosdev-code/kos-ui-sdk";
import {
  FosAvailabilityBeverageModel,
  FosAvailabilityBeverageOptions,
} from "./types";

const MODEL_TYPE = "fos-availability-beverage-model";

/**
 * @class
 * @since Jun-04-23
 * @author Mark Pomerant (mapomerant@coca-cola.com)
 * @category Core
 * @subcategory Models
 * @description
 *
 * Model that represents a beverages availability and visibility.
 *
 *
 **/
@kosModel<FosAvailabilityBeverageModel, FosAvailabilityBeverageOptions>(
  MODEL_TYPE
)
class FosAvailabilityBeverageModelImpl implements FosAvailabilityBeverageModel {
  id: string;
  available: boolean;
  visible: boolean;
  constructor(modelId: string, options: FosAvailabilityBeverageOptions) {
    this.id = modelId;
    this.available = options.available;
    this.visible = options.visible;
  }

  updateModel(options: FosAvailabilityBeverageOptions): void {
    this.available = options.available;
    this.visible = options.visible;
  }

  // -------------------LIFECYCLE----------------------------

  // -------------------SUBSCRIPTIONS----------------------------

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
      class: FosAvailabilityBeverageModelImpl,
      singleton: false,
    },
  },
  type: MODEL_TYPE,
  factory: Kos.Factory.create<
    FosAvailabilityBeverageModel,
    FosAvailabilityBeverageOptions
  >(MODEL_TYPE),
};
export default Registration;
