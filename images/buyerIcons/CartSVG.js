import React from 'react';
import { Circle, G, Path, Svg } from 'react-native-svg';

function CartSVG() {
  return (
    <>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="45"
        height="45"
        viewBox="0 0 45 45">
        <G
          id="Group_880"
          data-name="Group 880"
          transform="translate(-0.213 -0.492)">
          <G
            id="Ellipse_528"
            data-name="Ellipse 528"
            transform="translate(0.213 0.492)"
            fill="#f9f2ee"
            stroke="#ff5700"
            strokeWidth="1">
            <Circle cx="22.5" cy="22.5" r="22.5" stroke="none" />
            <Circle cx="22.5" cy="22.5" r="22" fill="none" />
          </G>
          <G
            id="Icon_feather-shopping-cart"
            data-name="Icon feather-shopping-cart"
            transform="translate(12.546 13.323)">
            <Path
              id="Path_11425"
              data-name="Path 11425"
              d="M13.789,30.895A.895.895,0,1,1,12.895,30,.895.895,0,0,1,13.789,30.895Z"
              transform="translate(-5.737 -13.001)"
              fill="none"
              stroke="#ff5700"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <Path
              id="Path_11426"
              data-name="Path 11426"
              d="M30.289,30.895A.895.895,0,1,1,29.395,30,.895.895,0,0,1,30.289,30.895Z"
              transform="translate(-12.396 -13.001)"
              fill="none"
              stroke="#ff5700"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <Path
              id="Path_11427"
              data-name="Path 11427"
              d="M1.5,1.5H5.079l2.4,11.98a1.789,1.789,0,0,0,1.789,1.44h8.7a1.789,1.789,0,0,0,1.789-1.44l1.431-7.506H5.973"
              transform="translate(-1.5 -1.5)"
              fill="none"
              stroke="#ff5700"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </G>
        </G>
      </Svg>
    </>
  );
}

export default CartSVG;
