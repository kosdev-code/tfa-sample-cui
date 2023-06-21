/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FosPourButton } from '../pour-button';

import { withFosSelectAndPour } from '../../hooks/fos-select-and-pour/with-fos-select-and-pour';
import { FosSelectAndPourModel } from '@kos-ui/tfa-sample-app-model';
import { KosLog, kosComponent } from '@kosdev-code/kos-ui-sdk';

const log = KosLog.getLogger('glass');
log.debug('glass component loaded');

const styles = css`
  border: 1px solid black;
  margin: 20px;
  padding: 20px;
`;
interface Props {
  fosSelectAndPour: FosSelectAndPourModel;
}
export const GlassComp: React.FunctionComponent<Props> = kosComponent(
  ({ fosSelectAndPour }) => {
    const [fillLevel, setFillLevel] = useState<number>(0);

    const intervalRef = useRef<number | null>(null);

    const startFilling = useCallback(() => {
      intervalRef.current = window.setInterval(() => {
        setFillLevel((prevFillLevel) => prevFillLevel + 3); // Increase fill level at a set rate
      }, 175); // Adjust the interval duration to control the filling speed
    }, []);

    const stopFilling = useCallback(() => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    }, []);

    useEffect(() => {
      if (fosSelectAndPour.isPouring) {
        startFilling();
      } else {
        stopFilling();
      }
    }, [fosSelectAndPour.isPouring, startFilling, stopFilling]);

    useEffect(() => {
      stopFilling();
      setFillLevel(0);
    }, [fosSelectAndPour.selectedBeverage, stopFilling]);

    const beverage = fosSelectAndPour?.selectedBeverage?.name ?? 'None';
    const fillColor = fosSelectAndPour?.selectedBeverage?.ringColor ?? 'None';
    const viewBox = '0 0 207.55 246.44';

    return (
      <>
        <div css={styles}>
          <h3>{beverage}</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox}
            width="200"
            height="400"
          >
            <g>
              <rect
                x="10"
                y={240 - fillLevel}
                width="190"
                height={fillLevel}
                fill={fillColor}
                style={{ transition: 'height 0.5s, y 0.5s' }}
              />
            </g>
            <g id="layer2" transform="translate(-162.8,-402.07)">
              <path
                id="path3771"
                fill="#ffffff"
                d="m163.14 402.34v243.94h206.56v-243.94h-206.56zm4.0312 3.5312 199.5 0.5-31.812 237.88h-139.91l-27.781-238.38z"
              />
              <path
                id="path2985"
                opacity="0.99"
                fillOpacity=".50195"
                stroke="#adadad"
                strokeWidth="7.1"
                fill="#bfbfbf"
                d="m166.35 405.62 29.235 239.34 139.77-0.33176 31.443-239z"
              />
              <path
                id="path3755"
                opacity="0.99"
                fillOpacity=".17899"
                fill="#ffffff"
                d="m276.78 419.5h72.226l-27.274 210.11-58.084 0.50508z"
              />
            </g>
          </svg>

          <FosPourButton></FosPourButton>
        </div>
      </>
    );
  }
);

export const Glass = withFosSelectAndPour(GlassComp);
