/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useCallback } from 'react';
import { withFosSelectAndPour } from '../../hooks/fos-select-and-pour/with-fos-select-and-pour';
import { VirtualDispenserButton } from '../buttons/virtual-dispenser-button/virtual-dispenser-button';
import { FosSelectAndPourModel } from '@kos-ui/tfa-sample-app-model';
import { KosLog, kosComponent } from '@kosdev-code/kos-ui-sdk';

const log = KosLog.getLogger('pour-button');
log.debug('pour-button component loaded');

const styles = css`
  display: flex;
  justify-content: center;
`;
interface Props {
  fosSelectAndPour: FosSelectAndPourModel;
}
export const PourButton: React.FunctionComponent<Props> = kosComponent(
  ({ fosSelectAndPour }) => {
    const handlePour = useCallback(() => {
      if (fosSelectAndPour.isPouring) {
        fosSelectAndPour.stop();
      } else {
        fosSelectAndPour.start();
      }
    }, [fosSelectAndPour]);

    return (
      <div css={styles}>
        <div
          style={{
            position: 'relative',
          }}
        >
          <VirtualDispenserButton
            label="No Beverage Selected"
            available={fosSelectAndPour.selectedBeverage?.available}
            selected={fosSelectAndPour.isPouring}
            borderColor={fosSelectAndPour.selectedBeverage?.ringColor}
            icon={fosSelectAndPour.selectedBeverage?.icon}
            waveEnabled={fosSelectAndPour.selectedBeverage?.waveEnabled}
            mainFlavorColor={fosSelectAndPour.selectedBeverage?.mainFlavorColor}
            flavorName={fosSelectAndPour.selectedBeverage?.flavorName}
            flavorFontColor={fosSelectAndPour.selectedBeverage?.flavorFontColor}
            onClick={handlePour}
          ></VirtualDispenserButton>
        </div>
      </div>
    );
  }
);

export const FosPourButton = withFosSelectAndPour(PourButton);
