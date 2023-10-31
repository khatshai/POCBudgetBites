import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SkipCancelButton} from '../Buttons';
import {BackArrow} from '../../images/Arrow';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../responsiveness/Metrics';
import BuyerOnBoardingOneSVG from '../../images/BuyerOnBoardingOneSVG';
import BuyerOnBoardingTwoSVG from '../../images/BuyerOnBoardingTwo';
import BuyerOnBoardingThreeSVG from '../../images/BuyerOnBoardingThreeSVG';

function BuyerOnBoarding({navigation}) {
  const showView = [
    {
      text: 'Get prompt notifications on discounts nearby',
      svgImg: <BuyerOnBoardingOneSVG />,
    },
    {
      text: 'Book products at discounted prices from nearby Sellers',
      svgImg: <BuyerOnBoardingTwoSVG />,
    },
    {
      text: 'Pick-Up your items from nearby Sellers through maps',
      svgImg: <BuyerOnBoardingThreeSVG />,
    },
  ];

  const [currentViewIndex, setCurrentViewIndex] = useState(0);

  const onNextButtonPress = () => {
    if (currentViewIndex >= 0 && currentViewIndex < showView.length - 1) {
      setCurrentViewIndex(currentViewIndex + 1);
    } else {
      navigation.navigate('Buyer_Sign_Up_Page');
    }
  };
  const onBackClick = () => {
    if (currentViewIndex > 0 && currentViewIndex <= showView.length){
      setCurrentViewIndex(currentViewIndex - 1);
    }
    else {
      navigation.navigate('Buyer_Type_Selection');
    }
  };

  const onSkipButtonPress = () => {
    navigation.navigate('Buyer_Sign_Up_Page');
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
  // buttonContainer: {
  //   position: 'absolute',
  //   bottom: 0,
  // },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    padding: moderateScale(10),
    marginTop: verticalScale(40),
  },
  text: {
    fontSize: moderateScale(20),
    color: 'rgba(0, 32, 88, 1)',
    fontFamily: 'Ubuntu',
    marginBottom: verticalScale(10),
    marginLeft: horizontalScale(10),
    marginRight: horizontalScale(10),
    textAlign: 'center',
  },
});
export default BuyerOnBoarding;
