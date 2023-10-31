import React from 'react';
import { Circle, G, Path, Svg } from 'react-native-svg';

function NotificationSVG() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40">
      <G id="Group_4" data-name="Group 4" transform="translate(-23 -38)">
        <Circle
          id="Ellipse_1"
          data-name="Ellipse 1"
          cx="20"
          cy="20"
          r="20"
          transform="translate(23 38)"
          fill="#ebf6f3"
        />
        <G id="Group_5" data-name="Group 5" transform="translate(31.44 46.44)">
          <Path
            id="Path_4"
            data-name="Path 4"
            d="M15.707,23.785a1.932,1.932,0,0,0,1.927-1.927H13.78A1.932,1.932,0,0,0,15.707,23.785Zm5.78-5.78V13.189c0-2.958-1.57-5.433-4.335-6.088V5h-2.89V7.1c-2.755.655-4.335,3.121-4.335,6.088v4.817L8,19.932V20.9H23.414v-.963Zm-1.927.963H11.853v-5.78c0-2.389,1.455-4.335,3.853-4.335S19.56,10.8,19.56,13.189Z"
            transform="translate(-4.147 -2.592)"
            fill="#009e83"
          />
          <Path
            id="Path_5"
            data-name="Path 5"
            d="M0,0H23.121V23.121H0Z"
            fill="none"
          />
        </G>
      </G>
    </Svg>
  );
}

export default NotificationSVG;
