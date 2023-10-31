import React, {useContext, useState} from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity, ScrollView} from 'react-native';
import {ForwardArrow, BackArrow} from '../images/Arrow';
import SellSvg from '../images/SellSvg';
import BuySVG from '../images/BuySVG';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../responsiveness/Metrics';
import {NextButton} from './Buttons';
import Yes from '../images/Yes';
import No from '../images/No';
import Context from './contextfolder/ContextProvider';
import {useTranslation} from 'react-i18next'

function UserTypeSelection({navigation}) {
  const { setSelectedRole } = useContext(Context);

  const [isDisabled, setIsDisabiled] = useState(true);
  const [isSellClicked, setIsSellClicked] = useState(false);
  const [isBuyClicked, setIsBuyClicked] = useState(false);
  const [isYesClicked, setIsYesClicked] = useState(false);
  const [isNoClicked, setIsNoClicked] = useState(false);
const {t} = useTranslation();
  const onPressSellHanlder = () => {
    setIsSellClicked(true);
    !isYesClicked && !isNoClicked && setIsDisabiled(true);
    setIsBuyClicked(false);
  };

  const onPressBuyHanlder = () => {
    setIsBuyClicked(true);
    !isYesClicked && !isNoClicked && setIsDisabiled(true);
    setIsSellClicked(false);
  };

  const onNextButtonPress = () => {
    if (isSellClicked) {
      navigation.navigate('Seller_Type_Selection');
      //navigation.navigate('Login_In_Page');
      setSelectedRole('seller');
    }
    if (isBuyClicked) {
      navigation.navigate('Buyer_Type_Selection');
      //navigation.navigate('Login_In_Page');
      setSelectedRole('buyer');
    }
  };

  const onBackClick = () => {
    navigation.navigate('Language_Comp');
  };

  const handleYesPress = () => {
    setIsYesClicked(true);
    setIsNoClicked(false);
    setIsDisabiled(false);
  };

  const handleNoPress = () => {
    setIsYesClicked(false);
    setIsNoClicked(true);
    setIsDisabiled(false);
  };

  return (
    <>
      <View style={styles.backArrowContainer}>
      <BackArrow onBackClick={onBackClick} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        <View style={styles.contentContainer}>
        <Image
          style={styles.imageStyles}
          resizeMethod="auto"
          source={require('../images/Group-995.png')}
        />
          <Text style={styles.text}>
           {t('translations.user_type_selection.intended_use_ques')}
          </Text>
          <TouchableOpacity
            style={[
              styles.sellBuyContainer,
              isSellClicked && styles.selectedItemBorder,
            ]}
            onPress={onPressSellHanlder}>
            <View style={styles.sellBuyIndividualCont}>
              <SellSvg />
              <Text style={styles.sellBuyText}>{t('translations.user_type_selection.sell')}</Text>
            </View>
            <View>
              <ForwardArrow />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sellBuyContainer,
              isBuyClicked && styles.selectedItemBorder,
            ]}
            onPress={onPressBuyHanlder}>
            <View style={styles.sellBuyIndividualCont}>
              <BuySVG />
              <Text style={styles.sellBuyText}> {t('translations.user_type_selection.buy')}</Text>
            </View>
            <View>
              <ForwardArrow />
            </View>
          </TouchableOpacity>
          {(isBuyClicked || isSellClicked) && (
            <View>
            <Text style={styles.text}>
            {isBuyClicked ? t('translations.user_type_selection.buy_ques') :
            t('translations.user_type_selection.sell_ques')}
          </Text>
          {isSellClicked && <Text style={styles.sellPassageText}>
             ({t('translations.user_type_selection.sell_msg')})
          </Text>}
          {!isSellClicked && <Text style={styles.sellPassageText}>
             ({t('translations.user_type_selection.buy_msg')})
          </Text>}
          <View style={styles.yesNoContainer}>
              <TouchableOpacity
                onPress={handleYesPress}
                style={styles.yesNoMargin}>
                <Yes
                circleColor={isYesClicked ? '#EAEFF8' : '#fff'}
                borderColor={isYesClicked ? '#002058' : 'none' }
                borderWidth={isYesClicked ? moderateScale(2) : 0}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleNoPress}
                style={styles.yesNoMargin}>
                <No
                circleColor={isNoClicked ? '#EAEFF8' : '#fff'}
                borderColor={isNoClicked ? '#002058' : 'none' }
                borderWidth={isNoClicked ? moderateScale(2) : 0}
                />
              </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <NextButton
            disablility={isDisabled}
            onNextButtonPress={onNextButtonPress}
          />
        </View>
      </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  backArrowContainer:{
    backgroundColor: '#F8F9FC',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
    alignItems: 'center',
  },
  imageStyles:{
    height:moderateScale(82),
    width:moderateScale(82),
  },
  scrollContainer: {
    flexGrow: 1,
    overflow: 'scroll',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: horizontalScale(2),
  },
  text: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: moderateScale(18),
    color: 'rgba(0, 32, 88, 1)',
    margin: moderateScale(15),
    textAlign: 'center',
  },
  sellBuyContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(15),
    height: moderateScale(80),
    width: moderateScale(300),
    margin: moderateScale(5),
    padding: moderateScale(5),
  },
  sellBuyIndividualCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:verticalScale(10),
    marginLeft:verticalScale(20),
  },
  sellBuyText: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: moderateScale(25),
    color: 'rgba(0, 32, 88, 1)',
    marginLeft: verticalScale(30),
    textAlign: 'center',
  },
  selectedItemBorder: {
    borderColor: 'rgba(0, 32, 88, 1)',
    borderWidth: moderateScale(2),
    backgroundColor: '#EAEFF8',
  },
  yesNoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
  },
  yesNoMargin: {
    margin: moderateScale(20),
  },
  yesOrNoPress: {
    borderColor: '#002058',
    backgroundColor: '#EAEFF8',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: moderateScale(30),
    alignSelf: 'flex-end',
    paddingRight:moderateScale(20),
  },
  sellPassageText:{
    fontFamily: 'Ubuntu-Regular',
    color: 'rgba(0, 32, 88, 1)',
    textAlign: 'center',
    fontSize:moderateScale(12),
  },
});

export default UserTypeSelection;
