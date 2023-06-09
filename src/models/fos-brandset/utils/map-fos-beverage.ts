import { BundleBeverage } from "@kosdev-code/fos-ui-bundle-reader";
import { FosBeverageOptions } from "../../fos-beverage";

/**
 * Map a FOS beverage to a kOS beverage options object that will be used to
 * create a kOS beverage.
 * @internal
 * @param beverage The FOS beverage to map.
 * @param translations The translations to use for the beverage.
 * @returns The kOS beverage options object.
 **/
export const mapFosBeverageToOptions =
  (translations: Record<string, string>) => (beverage: BundleBeverage) => {
    const beverageOptions: FosBeverageOptions = {
      name: translations[beverage.displayNameKey] || beverage.name,
      backgroundImage: beverage.backgroundImage,
      icon: beverage.icon,
      mainFlavorColor: beverage.flavor?.mainColor || "",
      flavorName: translations[beverage.flavor?.languageString] || "",
      lowCalorie: beverage.lowCalorie,
      ringColor: beverage.ringColor,
      flavorFontColor: beverage.flavorFontColor,
      flavorTextAlignment: beverage.flavorTextAlignment,

      waveEnabled: beverage.waveEnabled,
    };

    return beverageOptions;
  };
