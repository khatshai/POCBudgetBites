import React from 'react';
import {G, Svg, Circle, Path, TSpan, Text} from 'react-native-svg';
import {useTranslation} from 'react-i18next'


export default function Yes({circleColor, borderColor, borderWidth}) {
  const circleRadius = 44 - borderWidth / 2;
  const {t} = useTranslation();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="88"
      height="88"
      viewBox="0 0 88 88"
      >
      <G id="Group_570" data-name="Group 570" transform="translate(-24 -428)">
        <Circle
          id="Ellipse_43"
          data-name="Ellipse 43"
          cx="44"
          cy="44"
          r={circleRadius}
          transform="translate(24 428)"
          fill={circleColor}
          strokeWidth={borderWidth}
          stroke={borderColor}
        />
        <Text
          id="Yes"
          transform="translate(68 506)"
          fill="#002058"
          font-size="12"
          font-family="Ubuntu-Medium, Ubuntu"
          font-weight="500">
          <TSpan x="-9.612" y="0">
            {t('translations.yes')}
          </TSpan>
        </Text>
        <Path
          id="Path_5691"
          data-name="Path 5691"
          d="M236.159,392.5c-3-3.65-2.772-11.643,0-16.031s11.089-1.522,11.089-1.522l9.339-10.825a68,68,0,0,1,6.137-13.084l.334-.55.229.1c.131.056,3.205,1.445,2.1,7.188l-.02.063-.409.913a19.85,19.85,0,0,0-1.721,8.564c2.471.057,15.136.417,16.618,1.793a2.626,2.626,0,0,1,.838,1.768l.076,1.208a2.714,2.714,0,0,1-2.708,2.883h-.729l.516.59a2.59,2.59,0,0,1,.641,1.706v1a2.593,2.593,0,0,1-1.333,2.265l-.415.23.238.238a2.591,2.591,0,0,1-1.368,4.381l-2.711.493a4.14,4.14,0,0,1-3.66,3.874l-7.75.894a46.08,46.08,0,0,1-12.152.538l-1.187-.1S239.157,396.148,236.159,392.5Z"
          transform="translate(-190.466 95.208)"
          fill="#ffb7b7"
        />
      </G>
    </Svg>
  );
}
