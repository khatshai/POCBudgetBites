import React from 'react';
import { G, Rect, Svg, TSpan, Text } from 'react-native-svg';

function BudgetBitesSVG() {
  return (
    <>
      <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="294"
          height="82"
          viewBox="0 0 294 82"
        >
          <G
            id="Group_560"
            data-name="Group 560"
            transform="translate(-93.922 -502.322)"
          >
            <G
              id="Rectangle_67"
              data-name="Rectangle 67"
              transform="translate(93.922 502.322)"
              fill="#002058"
              stroke="#002058"
              strokeWidth="2"
            >
              <Rect width="294" height="82" rx="12" stroke="none" />
              <Rect x="1" y="1" width="292" height="80" rx="11" fill="none" />
            </G>
            <Text
              id="Budget_bites"
              data-name="Budget bites"
              transform="translate(240.922 556.322)"
              fill="#00aa8d"
              fontSize="37"
              fontFamily="Ubuntu"
            >
              <TSpan x="-110.297" y="0">
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

export default BudgetBitesSVG;
