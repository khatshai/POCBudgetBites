import React from 'react';
import { G, Path, Svg } from 'react-native-svg';

function HomeSVG({iconColor}) {
  return (
    <>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="24.587"
        height="27.042"
        viewBox="0 0 24.587 27.042">
        <G
          id="Icon_feather-home"
          data-name="Icon feather-home"
          transform="translate(-3.25 -1.75)">
          <Path
            id="Path_143"
            data-name="Path 143"
            d="M4.5,11.59,15.544,3l11.044,8.59v13.5a2.454,2.454,0,0,1-2.454,2.454H6.954A2.454,2.454,0,0,1,4.5,25.087Z"
            transform="translate(0 0)"
            fill="none"
            stroke={iconColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
          <Path
            id="Path_144"
            data-name="Path 144"
            d="M13.5,30.271V18h7.362V30.271"
            transform="translate(-1.638 -2.729)"
            fill="none"
            stroke={iconColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
        </G>
      </Svg>
    </>
  );
}

export default HomeSVG;
