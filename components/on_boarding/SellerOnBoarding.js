import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SellerOnBoardingOneSVG from '../../images/SellerOnBoardingOneSVG';
import {SkipCancelButton} from '../Buttons';
import {BackArrow} from '../../images/Arrow';
import { useTranslation } from 'react-i18next'
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../responsiveness/Metrics';
import SellerOnBoardingTwoSVG from '../../images/SellerOnBoardingTwoSVG';
import SellerOnBoardingThreeSVG from '../../images/SellerOnBoardingThreeSVG';

function SellerOnBoarding({navigation}) {
const { t } = useTranslation();
  const showView = [
    {
      text: t('translations.seller_onBoarding_msg'),
      svgImg: <SellerOnBoardingOneSVG />,
    },
    {
      text: t('translations.request_accept_buyers'),
      svgImg: <SellerOnBoardingTwoSVG />,
    },
    {
      text: t('translations.financial_loss'),
      svgImg: <SellerOnBoardingThreeSVG />,
    },
  ];

  const [currentViewIndex, setCurrentViewIndex] = useState(0);

  const onNextButtonPress = () => {
    if (currentViewIndex >= 0 && currentViewIndex < showView.length - 1) {
      setCurrentViewIndex(currentViewIndex + 1);
    } else {
      navigation.navigate('Seller_Sign_Up_Page');
    }
  };
  const onBackClick = () => {
    if (currentViewIndex > 0 && currentViewIndex <= showView.length){
      setCurrentViewIndex(currentViewIndex - 1);
    }
    else {
      navigation.navigate('User_Type_Selection');
    }
  };

  const onSkipButtonPress = () => {
    navigation.navigate('Seller_Sign_Up_Page');
  };

  return (
    <View style={styles.container}>
      <BackArrow onBackClick={onBackClick} />
      {currentViewIndex >= 0 && currentViewIndex <= showView.length &&
        <View style={styles.mainContainer}>
        <Text style={styles.text}>{showView[currentViewIndex].text}</Text>
        {showView[currentViewIndex].svgImg}
      </View>}
        <SkipCancelButton
          onSkipButtonPress={onSkipButtonPress}
          onNextButtonPress={onNextButtonPress}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    padding: moderateScale(10),
    marginTop: verticalScale(40),
  },
  text: {
    fontSize: moderateScale(20),
    color: 'rgba(0, 32, 88, 1)',
    fontFamily: 'Ubuntu-Medium',
    marginBottom: verticalScale(10),
    marginLeft: horizontalScale(10),
    marginRight: horizontalScale(10),
    textAlign: 'center',
  },
});
export default SellerOnBoarding;
