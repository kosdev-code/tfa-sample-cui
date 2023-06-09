import { kosComponent } from "@coca-cola/kos-ui-components";
import { Button, Typography } from "antd";
import React, { useContext } from "react";
import { ButtonGrid } from "../../components/button-grid/button-grid";
import { BeverageButton } from "../../components/buttons/beverage-button/beverage-button";
import { VirtualRouterContext } from "../../contexts/virtual-router-context";
import { FosBrandModel } from "../../models/fos-brand";
import { withFosBrand } from "../../hooks/fos-brand/with-fos-brand";
import { useFosSelectAndPourContext } from "../../contexts/fos-select-and-pour-context";

const { Title } = Typography;

interface BeverageComponentProps {
  fosBrand?: FosBrandModel;
}

const BeveragePageComponent = ({ fosBrand }: BeverageComponentProps) => {
  const { setRoute } = useContext(VirtualRouterContext);
  const fosSelectAndPour = useFosSelectAndPourContext();
  let flavorButtons: React.ReactElement[] = [];
  if (fosBrand) {
    const newFlavorButtons = fosBrand.beverages.data
      .filter((beverage) => beverage.visible)
      .map((beverage) => (
        <BeverageButton
          key={beverage.id}
          beverage={beverage}
          selected={beverage.isSelected}
        />
      ));
    flavorButtons = newFlavorButtons;
  }

  return (
    <div
      style={{
        backgroundImage: `url(${encodeURI(fosBrand?.backgroundImage || "")}`,
      }}
    >
      <Title>Select Your Flavor</Title>
      <Button
        key="back-button"
        onClick={() => {
          fosSelectAndPour?.setSelectedBeverage(undefined);
          setRoute("index");
        }}
      >
        Back
      </Button>

      <div style={{ padding: "50px" }}>
        <ButtonGrid spacing={24} wrap buttons={flavorButtons} />
      </div>
    </div>
  );
};

export const FosBeverage = kosComponent(BeveragePageComponent);

export const FosBeveragePage = ({ brandId }: { brandId?: string }) => {
  if (brandId === undefined) {
    return null;
  }
  const Component = withFosBrand(FosBeverage, brandId);
  return <Component />;
};
