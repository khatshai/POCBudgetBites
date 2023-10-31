import React from 'react';
import {G, Path, Svg} from 'react-native-svg';
import { moderateScale } from '../../responsiveness/Metrics';

function LocationSVG() {
  return (
    <Svg
      id="Group_8"
      data-name="Group 8"
      xmlns="http://www.w3.org/2000/svg"
      width={moderateScale(20)}
      height={moderateScale(20)}
      viewBox="0 0 16.294 16.294">
      <G id="Group_7" data-name="Group 7" transform="translate(2.716 1.358)">
        <Path
          id="Path_11"
          data-name="Path 11"
          d="M13.431,4A5.4,5.4,0,0,0,8,9.567q0,3.238,4.983,7.624a.691.691,0,0,0,.9,0q4.97-4.389,4.976-7.624A5.4,5.4,0,0,0,13.431,4Zm0,6.789a1.358,1.358,0,1,1,1.358-1.358A1.362,1.362,0,0,1,13.431,10.789Z"
          transform="translate(-8 -4)"
          fill="#002058"
        />
      </G>
      <Path
        id="Path_12"
        data-name="Path 12"
        d="M0,0H16.294V16.294H0Z"
        fill="none"
      />
    </Svg>
  );
}

export default LocationSVG;
