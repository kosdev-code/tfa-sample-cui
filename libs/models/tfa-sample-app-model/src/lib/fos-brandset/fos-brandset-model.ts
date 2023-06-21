import {
  kosModel,
  KosLog,
  Kos,
  kosFetch,
  KosModelContainer,
  IKosModelContainer,
  kosDependency,
} from "@kosdev-code/kos-ui-sdk";
import type { IKosDataModel, IKosVisitor } from "@kosdev-code/kos-ui-sdk";
import { FosBrandsetModel, FosBrandsetOptions } from "./types";

import {
  Bundle,
  BundleBrand,
  BundleReader,
  IMirror,
  PlatformSettings,
  registerLogger,
} from "@kosdev-code/fos-ui-bundle-reader";
import { FosBrand, FosBrandModel, FosBrandOptions } from "../fos-brand";
import { FosBeverage, FosBeverageOptions } from "../fos-beverage";
import { FosAvailability, FosAvailabilityModel } from "../fos-availability";
import { FosAvailabilityBeverage } from "../fos-availability-beverage";
import { mapFosBrandToOptions } from "./utils/map-fos-brand";
import { mapFosBeverageToOptions } from "./utils/map-fos-beverage";

const fosPort = window.kosFosPort || 9854;
const MODEL_TYPE = "fos-brandset-model";

const log = KosLog.getLogger("fos-brandset-model");

const defaultPlatformSettings: PlatformSettings = {
  supportAnimation: false,
  supportColorTransparency: false,
  supportRingOpacity: false,
};

interface MirrorConfig {
  enabled: boolean;
  mirrorDir: string;
  path: string;
}

// Create a naive implementation of the IMirror interface to normalize the
// interface between the FOS bundle reader and the KOS SDK.
const defaultMirror: IMirror = {
  enabled: false,
  setConfig: (config: MirrorConfig) => {
    log.debug(`setting config ${config}`);
  },
  getUrl: (relativeUrl: string) => {
    log.info(relativeUrl);
    return `http://localhost:${fosPort}/core/bundle${relativeUrl}`;
  },
  getJson: async (relativeUrl: string) => {
    log.debug(`getting json ${relativeUrl}`);
    const path = `fos:/core/bundle/${relativeUrl}`;
    const response = await kosFetch(path, { method: "GET", fos: true });
    try {
      if (response.status !== 200) {
        log.error(`error calling ${path}: ${response.status}`);
        return undefined;
      }
      const json = await response.json();
      return json;
    } catch (e) {
      const txt = await response.text();
      return txt;
    }
  },
  path: "",
};

/**
 * @class
 * @since Jun-04-23
 * @author Mark Pomerant (mapomerant@coca-cola.com)
 * @category Core
 * @subcategory Models
 * @description
 *
 * This class is a KOS model that represents a brandset.  It is a container for
 * FosBrandModel instances and is responsible for loading the FOS bundle that
 * contains the brandset data.
 *
 * @property {string} id - The unique identifier for this model.
 * @property {Record<string, string>} translations - A map of language codes to
 *  translated strings.
 * @property {IKosModelContainer<FosBrandModel>} brands - A container for the
 * FosBrandModel instances that are part of this brandset.
 *
 **/
@kosModel<FosBrandsetModel, FosBrandsetOptions>(MODEL_TYPE)
class FosBrandsetModelImpl implements FosBrandsetModel {
  id: string;
  translations: Record<string, string>;

  // dependency on the Availability model
  @kosDependency({ modelType: FosAvailability.type })
  fosAvailability!: FosAvailabilityModel;

  brands: IKosModelContainer<FosBrandModel>;
  private bundle?: Bundle;
  constructor(modelId: string, options: FosBrandsetOptions) {
    log.debug(`creating fos brandset ${modelId}: ${options}`);
    this.id = modelId;
    this.translations = {};
    this.brands = new KosModelContainer<FosBrandModel>({
      indexMap: { cluster: "clusterId" },
    });
  }

  /**
   * @method
   * @since Jun-04-23
   * @memberof FosBrandsetModel
   * @description
   * This computed property returns the brands in this brandset, grouped by
   * cluster.
   * @category computed
   **/
  get clusterBrands() {
    const results: FosBrandModel[][] = [];
    const clusters = this.brands.index.get("cluster");
    Array.from(clusters?.index.keys() || []).forEach((clusterId) => {
      const brands = clusters?.index.get(clusterId);
      if (brands) {
        results.push(Array.from(brands.values()) || []);
      }
    });
    return results;
  }

  updateModel(options: FosBrandsetOptions): void {
    // Update model properties here.
    log.debug(`updating fos brandset ${options}`);
  }

  // -------------------LIFECYCLE----------------------------

  /**
   * @method
   * @since Jun-04-23
   * @memberof FosBrandsetModel
   * @description
   * This method is called when the model is first created.  It is responsible
   * for loading the FOS bundle that contains the brandset data.
   *
   * It will load the bundle from the FOS brandset and convert the data into
   * kOS models for the collection of brands and beverages.
   * @category lifecycle
   * @async
   * @returns {Promise<void>}
   **/
  async load(): Promise<void> {
    registerLogger(KosLog);
    log.debug(`loading fos brandset ${this.id}`);

    const reader = new BundleReader();
    const bundle = await reader.readBundle(
      defaultMirror,
      ["en_US"],
      defaultPlatformSettings,
      []
    );
    const transFileContents = await defaultMirror.getJson("en_US.json");
    Object.assign(this.translations, transFileContents);
    this.bundle = bundle;
    Object.keys(this.bundle.clusters).forEach((clusterId) => {
      const cluster = this.bundle?.clusters[clusterId];
      const brands: BundleBrand[] = cluster?.brands;
      brands?.forEach((brand) => {
        const brandOptions: FosBrandOptions = mapFosBrandToOptions(brand);
        const fosBrand = FosBrand.factory(String(brand.id))(brandOptions);
        brand.beverages.forEach((beverage) => {
          const beverageOptions: FosBeverageOptions = mapFosBeverageToOptions(
            this.translations
          )(beverage);
          const fosBeverage = FosBeverage.factory(
            String(beverage.fosBeverageId)
          )(beverageOptions);
          fosBrand.beverages.addModel(fosBeverage);
        });
        this.brands.addModel(fosBrand);
      });
    });
  }

  // -------------------ENTITY----------------------------

  accept(visitor: IKosVisitor<IKosDataModel>) {
    visitor.visit(this);
  }

  getChildren() {
    return [...this.brands.data];
  }
}

/**
 * Registration bean used to register all of the FOS models with the KOS SDK.
 **/
const Registration = {
  registration: {
    [MODEL_TYPE]: {
      class: FosBrandsetModelImpl,
      singleton: true,
    },
    ...FosBrand.registration,
    ...FosBeverage.registration,
    ...FosAvailability.registration,
    ...FosAvailabilityBeverage.registration,
  },
  type: MODEL_TYPE,
  factory: Kos.Factory.create<FosBrandsetModel, FosBrandsetOptions>(MODEL_TYPE),
};
export default Registration;
