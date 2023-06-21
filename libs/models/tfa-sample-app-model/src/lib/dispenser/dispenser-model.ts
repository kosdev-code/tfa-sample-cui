import { kosModel, KosLog, Kos } from "@kosdev-code/kos-ui-sdk";
import type { IKosDataModel, IKosVisitor } from "@kosdev-code/kos-ui-sdk";
import { DispenserModel, DispenserOptions } from "./types";

const MODEL_TYPE = "dispenser-model";

const log = KosLog.getLogger("dispenser-model");

@kosModel<DispenserModel, DispenserOptions>(MODEL_TYPE)
class DispenserModelImpl implements DispenserModel {
  id: string;
  name?: string;
  constructor(modelId: string, options: DispenserOptions) {
    this.id = modelId;
    this.name = options.name || "dispenser";
  }

  updateModel(options: DispenserOptions): void {
    this.name = options.name || "dispenser";
  }

  // -------------------LIFECYCLE----------------------------

  async init(): Promise<void> {
    log.debug(`initializing dispenser ${this.id}`);
  }

  async load(): Promise<void> {
    log.debug(`loading dispenser ${this.id}`);
  }

  async ready(): Promise<void> {
    log.debug(`ready dispenser ${this.id}`);
  }

  async unload(): Promise<void> {
    log.debug(`unloading dispenser ${this.id}`);
  }

  async activate(): Promise<void> {
    log.debug(`activating dispenser ${this.id}`);
  }

  async deactivate(): Promise<void> {
    log.debug(`deactivating dispenser ${this.id}`);
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
      class: DispenserModelImpl,
      singleton: true,
    },
  },
  type: MODEL_TYPE,
  factory: Kos.Factory.create<DispenserModel, DispenserOptions>(MODEL_TYPE),
};
export default Registration;
