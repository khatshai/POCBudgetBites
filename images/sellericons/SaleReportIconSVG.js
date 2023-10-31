import React from 'react';
import {Circle, G, Line, Path, Svg} from 'react-native-svg';
import { moderateScale } from '../../responsiveness/Metrics';

function SaleReportIconSVG({iconColor}) {
  return (
    <>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28">
        <G id="Layer_8" transform="translate(-9.334 -13.568)">
          <G
            id="Ellipse_41"
            data-name="Ellipse 41"
            transform="translate(9.334 13.568)"
            fill="none"
            stroke={iconColor}
            stroke-width="2.5">
            <Circle cx="14" cy="14" r="14" stroke="none" />
            <Circle cx="14" cy="14" r="12.75" fill="none" />
          </G>
          <G
            id="Group_555"
            data-name="Group 555"
            transform="translate(3.067 6.1)">
            <Path
              id="Path_5504"
              data-name="Path 5504"
              d="M90.685,15.03c2.659.047,4.638,1.966,4.737,3.834.115,2.184-2.321,4.655-5.532,4.247l4.922,5.9"
              transform="translate(-73.112 -0.029)"
              fill="none"
              stroke={iconColor}
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
            <Line
              id="Line_78"
              data-name="Line 78"
              x2="10.534"
              transform="translate(15 15)"
              fill="none"
              stroke={iconColor}
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
            <Line
              id="Line_79"
              data-name="Line 79"
              x2="10.534"
              transform="translate(15 19.031)"
              fill="none"
              stroke={iconColor}
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </G>
        </G>
      </Svg>
    </>
  );
}

export default SaleReportIconSVG;

export function MyOrdersSvg({iconColor}){
  return (
    <>
      <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={moderateScale(25)}
      height={moderateScale(28)}
      viewBox="0 0 22.4 28">
      <G id="Group_180" data-name="Group 180" transform="translate(-5 -2.5)">
        <G id="Group_179" data-name="Group 179" transform="translate(5 2.5)">
          <Path
            id="Path_134"
            data-name="Path 134"
            d="M27.6,9.6H24.8a5.6,5.6,0,0,0-11.2,0H10.8A2.808,2.808,0,0,0,8,12.4V29.2A2.808,2.808,0,0,0,10.8,32H27.6a2.808,2.808,0,0,0,2.8-2.8V12.4A2.808,2.808,0,0,0,27.6,9.6ZM19.2,6.8A2.808,2.808,0,0,1,22,9.6H16.4A2.808,2.808,0,0,1,19.2,6.8Zm8.4,22.4H10.8V12.4h2.8v2.8a1.4,1.4,0,1,0,2.8,0V12.4H22v2.8a1.4,1.4,0,1,0,2.8,0V12.4h2.8Z"
            transform="translate(-8 -4)"
            fill={iconColor}
          />
        </G>
      </G>
    </Svg>
    </>
  );
}
