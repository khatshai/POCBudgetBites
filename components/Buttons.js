import React from 'react';
import {useTranslation} from 'react-i18next';

import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../responsiveness/Metrics';

function NextButton({onNextButtonPress, disablility}) {
  const {t} = useTranslation();

  return (
    <TouchableOpacity
      style={[styles.buttonNext, disablility && styles.disabledNextButton]}
      onPress={onNextButtonPress}
      disabled={disablility ? disablility : false}>
      <Text style={styles.buttonNextText}>{t('translations.next')}</Text>
    </TouchableOpacity>
  );
}

function SkipCancelButton({onSkipButtonPress, onNextButtonPress}) {
  const {t} = useTranslation();

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={onSkipButtonPress}>
        <Text style={[styles.skipButtonText, styles.buttonText]}>{t('translations.skip')}</Text>
      </TouchableOpacity>
      <NextButton onNextButtonPress={onNextButtonPress} />
    </View>
  );
}
const styles = StyleSheet.create({
  buttonNext: {
    backgroundColor: 'rgba(0, 32, 88, 1)',
    justifyContent: 'center',
    width: moderateScale(165),
    height: moderateScale(36),
    borderRadius: moderateScale(20),
  },
  buttonNextText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Ubuntu-Medium',
  },
  disabledNextButton: {
    opacity: 0.5,
  },
  buttonContainer: {
    display:'flex',
    width:'96%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom:verticalScale(19),
  },
  skipButton: {
    justifyContent: 'center',
    width: moderateScale(165),
    height: moderateScale(34),
    borderRadius: moderateScale(20),
    borderColor: 'rgba(0, 32, 88, 1)',
    borderWidth: 1,
    backgroundColor: 'white',
    marginLeft:moderateScale(20),
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Ubuntu-Medium',
  },
  skipButtonText: {
    color: 'rgba(0, 32, 88, 1)',
  },
});

export {NextButton, SkipCancelButton};
