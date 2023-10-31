import React from 'react';
import {Circle, G, Path, Svg, TSpan, Text} from 'react-native-svg';
import {useTranslation} from 'react-i18next'

export default function No({circleColor, borderColor, borderWidth}) {
  const circleRadius = 44 - borderWidth / 2;
  const {t} = useTranslation();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="88"
      height="88"
      viewBox="0 0 88 88">
      <G id="Group_569" data-name="Group 569" transform="translate(-153 -428)">
        <Circle
          id="Ellipse_44"
          data-name="Ellipse 44"
          cx="44"
          cy="44"
          r={circleRadius}
          transform="translate(153 428)"
          fill={circleColor}
          strokeWidth={borderWidth}
          stroke={borderColor}
        />
        <Text
          id="No"
          transform="translate(197 506)"
          fill="#002058"
          fontSize="12"
          fontFamily="Ubuntu-Medium, Ubuntu"
          fontWeight="500">
          <TSpan x="-8.028" y="0">
            {t('translations.no')}
          </TSpan>
        </Text>
        <Path
          id="Path_5694"
          data-name="Path 5694"
          d="M278.611,351.805c3,3.65,2.772,11.643,0,16.031s-11.09,1.522-11.09,1.522l-9.339,10.825a68,68,0,0,1-6.137,13.084l-.334.55-.229-.1c-.131-.056-3.205-1.445-2.1-7.188l.02-.063.409-.913a19.85,19.85,0,0,0,1.721-8.564c-2.471-.057-15.136-.417-16.619-1.793a2.626,2.626,0,0,1-.838-1.768L234,372.221a2.714,2.714,0,0,1,2.709-2.883h.729l-.516-.59a2.59,2.59,0,0,1-.641-1.706v-1a2.593,2.593,0,0,1,1.333-2.265l.415-.23-.238-.238a2.591,2.591,0,0,1,1.369-4.381l2.712-.493a4.14,4.14,0,0,1,3.66-3.874l7.751-.894a46.081,46.081,0,0,1,12.152-.538l1.187.1S275.613,348.155,278.611,351.805Z"
          transform="translate(-60.385 95.208)"
          fill="#ffb7b7"
        />
      </G>
    </Svg>
  );
}
