import { BundleBrand } from "@kosdev-code/fos-ui-bundle-reader";
import { FosBrandOptions } from "../../fos-brand/types";

/**
 * Map a FOS brand to a FOS brand options object.
 * @param brand The FOS brand to map.
 * @returns The FOS brand options object.
 * @internal
 * **/
export const mapFosBrandToOptions = (brand: BundleBrand) => {
  const brandOptions: FosBrandOptions = {
    name: brand.name,
    icon: brand.icon,
    cuiVisible: brand.cuiVisible,
    backgroundImage: brand.background,
    carbonated: brand.carbonated,
    lowCalorie: brand.lowCalorie,
    caffeineFree: brand.caffeineFree,
    available: brand.available,
    clusterId: brand.position.clusterId,
    position: {
      clusterId: String(brand.position.clusterId),
      index: brand.position.index,
      locked: brand.position.locked,
    },
  };
  return brandOptions;
};
