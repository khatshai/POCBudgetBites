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
import Icon from 'react-native-vector-icons/Ionicons';
import { BackArrow } from '../images/Arrow';

function ResetPassword({navigation}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showRetyePassword, setShowRetypePassword] = useState(false);

  const [newPasswordChange, setNewPasswordChange] = useState('');
  const [reEnterPasswordChange, setReEnterPasswordChange] = useState('');

  const onTogglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const onToggleRetypePasswordVisibility = () => {
    setShowRetypePassword(prevRetypePassword => !prevRetypePassword);
  };

  const onNewPasswordChange = text => {
    setNewPasswordChange(text);
  };

  const onReEnterPasswordChange = text => {
    setReEnterPasswordChange(text);
  };

  const onContinueClicked = () => {
    navigation.navigate('Login_In_Page');
  };

  const onBackClick = () => {
    navigation.navigate('Verification_Code');
  };

  return (
    <>
        <View style={styles.backArrowContainer}>
        <BackArrow onBackClick={onBackClick}/>
        </View>
    <View style={styles.container}>
      <BBSVG />
      <Text style={styles.welcomeText}>Reset Password</Text>
      <Text style={styles.enterDetailsText}>Set a new password for your account</Text>
      <View style={styles.passwordContainer}>
      <View style={styles.inputField}>
        <TextInput
          style={styles.input}
          placeholder="Enter New Password*"
          secureTextEntry={true}
          placeholderTextColor="#002058"
          onChangeText={onNewPasswordChange}
          value={newPasswordChange}
        />
      </View>
      <TouchableOpacity
          style={styles.visibility}
          onPress={onTogglePasswordVisibility}>
          {showPassword ? (
            <Icon
              name="eye-outline"
              size={moderateScale(20)}
              style={styles.iconColor}
            />
          ) : (
            <Icon
              name="eye-off-outline"
              size={moderateScale(20)}
              style={styles.iconColor}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholder="Re-enter New Password*"
            placeholderTextColor="#002058"
            secureTextEntry={!showRetyePassword}
            onChangeText={onReEnterPasswordChange}
            value={reEnterPasswordChange}
          />
        </View>
        <TouchableOpacity
          style={styles.visibility}
          onPress={onToggleRetypePasswordVisibility}>
          {showRetyePassword ? (
            <Icon
              name="eye-outline"
              size={moderateScale(20)}
              style={styles.iconColor}
            />
          ) : (
            <Icon
              name="eye-off-outline"
              size={moderateScale(20)}
              style={styles.iconColor}
            />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onContinueClicked} style={styles.buttonSignIn}>
        <Text style={styles.buttonSignInText}>Update Password</Text>
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
  welcomeText: {
    color: '#002058',
    fontSize: moderateScale(20),
    textAlign: 'center',
    marginTop: verticalScale(20),
    fontFamily:'Ubuntu-Medium',
  },
  enterDetailsText: {
    color: '#002058',
    fontSize: moderateScale(12),
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
  input: {
    fontSize: moderateScale(14),
    marginLeft:horizontalScale(2),
    fontFamily:'Ubuntu-Regular',
  },
  passwordContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  registerContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: moderateScale(10),
  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#002058',
  },
  visibility: {
    position: 'absolute',
    right: moderateScale(20),
    top: '50%',
    transform: [{translateY: -12.5}],
  },
  buttonSignIn: {
    backgroundColor: 'rgba(0, 32, 88, 1)',
    margin: '4%',
    justifyContent: 'center',
    width: moderateScale(165),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
  },
  buttonSignInText: {
    color: 'white',
    textAlign: 'center',
    fontSize: moderateScale(14),
    fontFamily:'Ubuntu-Medium',
  },
  disabledSignInButton: {
    opacity: 0.5,
  },
  iconColor: {
    color: 'rgba(0, 32, 88, 1)',
  },
});
export default ResetPassword;
