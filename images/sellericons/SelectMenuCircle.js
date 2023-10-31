import React from 'react';
import {Circle, G, Rect, Svg} from 'react-native-svg';

function SelectMenuCircle() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36">
      <G id="Group_681" data-name="Group 681" transform="translate(-309 -120)">
        <G
          id="Rectangle_500"
          data-name="Rectangle 500"
          transform="translate(309 120)"
          fill="#fff"
          stroke="#cbe5de"
          stroke-width="1.5">
          <Rect width="36" height="36" rx="18" stroke="none" />
          <Rect
            x="0.75"
            y="0.75"
            width="34.5"
            height="34.5"
            rx="17.25"
            fill="none"
          />
        </G>
        <G id="Group_681-2" data-name="Group 681" transform="translate(-38 -1)">
          <Circle
            id="Ellipse_86"
            data-name="Ellipse 86"
            cx="2"
            cy="2"
            r="2"
            transform="translate(363 130)"
            fill="#009e83"
          />
          <Circle
            id="Ellipse_87"
            data-name="Ellipse 87"
            cx="2"
            cy="2"
            r="2"
            transform="translate(363 137)"
            fill="#009e83"
          />
          <Circle
            id="Ellipse_88"
            data-name="Ellipse 88"
            cx="2"
            cy="2"
            r="2"
            transform="translate(363 144)"
            fill="#009e83"
          />
        </G>
      </G>
    </Svg>
  );
}

export default SelectMenuCircle;
