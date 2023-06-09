import { Typography } from "antd";

import { kosComponent } from "@coca-cola/kos-ui-components";

import { BrandButton } from "../../components/buttons/brand-button/brand-button";
import { useFosBrandset } from "../../hooks/fos-brandset/use-fos-brandset";

const { Title } = Typography;
interface BrandPageProps {
  mirror?: boolean;
}

const BrandPageComponent: React.FC<BrandPageProps> = () => {
  const { model } = useFosBrandset();
  const clusters = model?.clusterBrands || [];

  const buttonClusters = clusters.map((cluster, idx) => {
    const buttons = cluster
      .filter((brand) => brand.visible)
      .map((brand) => <BrandButton key={brand.id} brand={brand} />);
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          paddingBottom: 20,
          paddingTop: 20,
          borderBottom: "1px solid #ccc",
        }}
        key={idx}
      >
        {buttons}
      </div>
    );
  });

  return (
    <>
      <Title>Select Your Drink</Title>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingInline: 20,
        }}
      >
        {buttonClusters}
      </div>
    </>
  );
};

export default kosComponent(BrandPageComponent);
