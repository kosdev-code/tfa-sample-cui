import { useContext } from 'react';
import { VirtualRouterContext } from '../../../contexts/virtual-router-context';
import { VirtualDispenserButton } from '../virtual-dispenser-button/virtual-dispenser-button';
import { kosComponent } from '@kosdev-code/kos-ui-sdk';

interface BrandButtonProps {
  brand: { id: string; name: string; icon?: string; available?: boolean };
}

export const BrandButtonComp: React.FC<BrandButtonProps> = ({ brand }) => {
  const { setRoute } = useContext(VirtualRouterContext);

  const handleBrandClick = (id: string) => {
    setRoute(`beverage/${id}`);
  };

  return (
    <div style={{ cursor: 'pointer' }}>
      <VirtualDispenserButton
        available={brand.available}
        icon={brand.icon}
        id={brand.id}
        label={brand.name}
        onClick={() => handleBrandClick(brand.id)}
      />
    </div>
  );
};

export const BrandButton = kosComponent(BrandButtonComp);
