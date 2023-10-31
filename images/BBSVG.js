import React from 'react';
import { G, Rect, Svg, TSpan, Text } from 'react-native-svg';

function BBSVG() {
  return (
    <>
      <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="82"
          height="82"
          viewBox="0 0 82 82"
        >
          <G
            id="Group_560"
            data-name="Group 560"
            transform="translate(-199.922 -502.322)"
          >
            <G
              id="Rectangle_67"
              data-name="Rectangle 67"
              transform="translate(199.922 502.322)"
              fill="#002058"
              stroke="#002058"
              strokeWidth="2"
            >
              <Rect width="82" height="82" rx="12" stroke="none" />
              <Rect x="1" y="1" width="80" height="80" rx="11" fill="none" />
            </G>
            <Text
              id="Bb"
              transform="translate(240.922 556.322)"
              fill="#00aa8d"
              fontSize="37"
              fontFamily="Ubuntu"
            >
              <TSpan x="-23.069" y="0">
                B
              </TSpan>
              <TSpan
                y="0"
                fill="#ff5700"
                fontFamily="Ubuntu-Bold, Ubuntu"
                fontWeight="700"
              >
                b
              </TSpan>
            </Text>
            <Text
              id="Budget_bites"
              data-name="Budget bites"
              transform="translate(240.922 546.322)"
              fill="#00aa8d"
              fontSize="7"
              fontFamily="Ubuntu"
              opacity="0"
            >
              <TSpan x="-20.867" y="0">
                Budget{' '}
              </TSpan>
              <TSpan
                y="0"
                fill="#ff5700"
                fontFamily="Ubuntu-Bold, Ubuntu"
                fontWeight="700"
              >
                bites
              </TSpan>
            </Text>
          </G>
        </Svg>
    </>
  );
}

export default BBSVG;
