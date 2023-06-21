import { useContext } from 'react';
import { VirtualRouterContext } from '../../../contexts/virtual-router-context';
import { VirtualDispenserButton } from '../virtual-dispenser-button/virtual-dispenser-button';

import { FosBeverageModel } from '@kos-ui/tfa-sample-app-model';
import { kosComponent } from '@kosdev-code/kos-ui-sdk';

interface BeverageButtonProps {
  beverage: FosBeverageModel;
  selected?: boolean;
}

export const BeverageButtonComp: React.FC<BeverageButtonProps> = ({
  beverage,
  selected,
}) => {
  const { id, name, icon, available } = beverage;
  const { resetActiveTimer } = useContext(VirtualRouterContext);

  const handleFlavorClick = () => {
    resetActiveTimer();
    if (beverage.available) {
      beverage.setSelected();
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        cursor: beverage.available ? 'pointer' : 'not-allowed',
      }}
    >
      <VirtualDispenserButton
        borderColor={selected ? beverage.ringColor : undefined}
        selected={selected}
        available={available}
        icon={icon}
        id={id}
        label={name}
        waveEnabled={beverage.waveEnabled}
        mainFlavorColor={beverage.mainFlavorColor}
        flavorName={beverage.flavorName}
        flavorFontColor={beverage.flavorFontColor}
        onClick={handleFlavorClick}
      />
    </div>
  );
};

export const BeverageButton = kosComponent(BeverageButtonComp);
