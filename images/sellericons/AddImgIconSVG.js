import React from 'react';
import Svg, { G, Rect, TSpan, Text } from 'react-native-svg';

function AddImgIconSVG() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="207"
      height="110"
      viewBox="0 0 207 110">
      <G id="Group_905" data-name="Group 905" transform="translate(-93 -395)">
        <G
          id="Rectangle_62"
          data-name="Rectangle 62"
          transform="translate(93 395)"
          fill="#fff"
          stroke="#869fcb"
          strokeWidth="1"
          strokeDasharray="5 10">
          <Rect width="207" height="110" rx="12" stroke="none" />
          <Rect
            x="0.5"
            y="0.5"
            width="206"
            height="109"
            rx="11.5"
            fill="none"
          />
        </G>
        <Text
          id="Add_an_Image"
          data-name="Add an Image"
          transform="translate(197 455)"
          fill="#002058"
          fontSize="12"
          fontFamily="Ubuntu-Medium, Ubuntu"
          fontWeight="500">
          <TSpan x="-37.77" y="0">
            Add an Image
          </TSpan>
        </Text>
      </G>
    </Svg>
  );
}

export default AddImgIconSVG;
