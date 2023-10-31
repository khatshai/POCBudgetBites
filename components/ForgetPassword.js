import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import BBSVG from '../images/BBSVG';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../responsiveness/Metrics';
import {BackArrow} from '../images/Arrow';

function ForgetPassword({navigation}) {
  const [mobileNumber, setMobileNumber] = useState('');

  const onMobileNumberChange = text => {
    setMobileNumber(text);
  };

  const onContinueHandler = () => {
    navigation.navigate('Verification_Code');
  };

  const onBackClick = () => {
    navigation.navigate('Login_In_Page');
  };

  return (
    <>
    <View style={styles.backArrowContainer}>
    <BackArrow onBackClick={onBackClick}/>
    </View>
      <View style={styles.container}>
        <BBSVG />
        <Text style={styles.forgetPasswordText}>Forgot Password</Text>
        <Text style={styles.enterText}>
          Enter your mobile number for the verification processs
        </Text>
        <View style={styles.inputField}>
        <TextInput
          style={styles.input}
          placeholder="Mobile number*"
          placeholderTextColor="#002058"
          onChangeText={onMobileNumberChange}
          value={mobileNumber}
        />
        </View>
        <TouchableOpacity style={styles.buttonContinue}>
          <Text style={styles.buttonContinueText} onPress={onContinueHandler}>
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
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Ubuntu',
    backgroundColor: '#F8F9FC',
  },
  backArrowContainer:{
    backgroundColor: '#F8F9FC',
  },
  forgetPasswordText: {
    color: '#002058',
    fontSize: moderateScale(20),
    textAlign: 'center',
    marginTop: verticalScale(25),
    fontFamily:'Ubuntu-Medium',
  },
  enterText: {
    color: '#002058',
    fontSize: moderateScale(12),
    marginTop:moderateScale(3),
    fontFamily:'Ubuntu-Regular',
    marginBottom:moderateScale(20),
  },
  inputField: {
    borderColor: '#B5C7E6',
    borderWidth: horizontalScale(1),
    borderRadius: moderateScale(20),
    margin: moderateScale(10),
    width: moderateScale(330),
    height: moderateScale(50),
  },
  input:{
    fontSize: moderateScale(14),
    marginLeft:horizontalScale(2),
    fontFamily:'Ubuntu-Regular',
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
export default ForgetPassword;
