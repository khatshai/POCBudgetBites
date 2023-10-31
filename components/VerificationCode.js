import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import BBSVG from '../images/BBSVG';
import {
  moderateScale,
  verticalScale,
} from '../responsiveness/Metrics';
import {BackArrow} from '../images/Arrow';

function VerificationCode({navigation}) {
  const [verificationText, setVerificationText] = useState(['', '', '', '']);

  const verificationCodeRef = useRef([]);

  const onCodeChange = (index, text) => {
    if (/^\d*$/.test(text) && text.length <= 1) {
      const newVerificationCode = [...verificationText];
      newVerificationCode[index] = text;
      setVerificationText(newVerificationCode);
      if (text.length === 1 && index < verificationCodeRef.current.length - 1) {
        verificationCodeRef.current[index + 1].focus();
      }
    } else {
      const newVerificationCode = [...verificationText];
      newVerificationCode[index] = '';
      setVerificationText(newVerificationCode);
    }
  };

  const onContinueHandler = () => {
    navigation.navigate('Reset_Password');
  };

  const onBackClick = () => {
    navigation.navigate('Forget_Password');
  };

  return (
    <>
    <View style={styles.backArrowContainer}>
    <BackArrow onBackClick={onBackClick} />
    </View>
      <View style={styles.container}>
        <BBSVG />
        <Text style={styles.verificationText}>Verification</Text>
        <Text style={styles.enterText}>
          Enter the 4 digit code that you received on your mobile
        </Text>
        <View style={styles.inputContainer}>
          {Array.from({length: 4}).map((_, index) => (
            <View key={index} style={styles.inputField}>
              <TextInput
                style={styles.input}
                placeholderTextColor="#002058"
                onChangeText={text => onCodeChange(index, text)}
                value={verificationText[index]}
                keyboardType="numeric"
                maxLength={1}
                ref={ref => (verificationCodeRef.current[index] = ref)}
              />
            </View>
          ))}
        </View>
        <TouchableOpacity onPress={onContinueHandler} style={styles.buttonContinue}>
          <Text style={styles.buttonContinueText} >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Ubuntu',
    backgroundColor: '#F8F9FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrowContainer:{
    backgroundColor: '#F8F9FC',
  },
  verificationText: {
    color: '#002058',
    fontSize: moderateScale(20),
    textAlign: 'center',
    marginTop: verticalScale(20),
    fontFamily:'Ubuntu-Medium',
  },
  enterText: {
    color: '#002058',
    fontSize: moderateScale(12),
    fontFamily:'Ubuntu-Regular',
  },
  inputContainer: {
    flexDirection: 'row',
  },
  inputField: {
    borderRadius: moderateScale(20),
    margin: moderateScale(10),
    width: moderateScale(56),
    height: moderateScale(56),
    backgroundColor: '#EAEFF8',
    justifyContent: 'center',
  },
  input: {
    textAlign: 'center',
    fontFamily:'Ubuntu-Medium',
    fontSize:moderateScale(16),
    color: '#002058',
  },
  buttonContinue: {
    backgroundColor: 'rgba(0, 32, 88, 1)',
    margin: '4%',
    justifyContent: 'center',
    width: moderateScale(165),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
  },
  buttonContinueText: {
    color: 'white',
    textAlign: 'center',
    fontSize: moderateScale(14),
    fontFamily:'Ubuntu-Medium',
  },
  disabledSignInButton: {
    opacity: 0.5,
  },
});
export default VerificationCode;
