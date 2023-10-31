import React, {useEffect, useCallback, useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../responsiveness/Metrics';
import Icon from 'react-native-vector-icons/Ionicons';
import Context from './contextfolder/ContextProvider';
import { userLogin } from '../services/ProductServices';
import BuyerContext from './contextfolder/BuyerContextProvider';

function LoginPage({navigation}) {
  const { selectedRole, setAuthToken, setUserDetails } = useContext(Context);

  const {setBuyerAuthToken, setBuyerUserDetails} = useContext(BuyerContext);

  const [showPassword, setShowPassword] = useState(false);

  const [mobileNumber, setMobilenumber] = useState('');
  const [password, setPassword] = useState('');

  const onTogglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const onMobileNumberChange = text => {
    setMobilenumber(text);
  };

  const onPasswordChange = text => {
    setPassword(text);
  };

  const onSignUpClicked = () => {
    if (selectedRole === 'seller'){
      navigation.navigate('Seller_Sign_Up_Page');
    }
    if (selectedRole === 'buyer'){
      navigation.navigate('Buyer_Sign_Up_Page');
    }
  };

  const onForgetPasswordClicked = () => {
    navigation.navigate('Forget_Password');
  };

const onSignInClicked = useCallback(async () => {
  const loginDetails = {
    mobile: mobileNumber,
    password: password,
    userType:selectedRole,
  };

    const response = await userLogin({loginDetails});
    if (response.ok) {
      const json = await response.json();
      if (selectedRole === 'seller' && json.succes){
        setAuthToken(json.authToken);
        setUserDetails(json.useDetails);
        console.log(json);
        navigation.navigate('Tab');
      }
      if (selectedRole === 'buyer' && json.succes){
        console.log('Heloooooooooooooooooooooo',json);
        setBuyerAuthToken(json.authToken);
        setBuyerUserDetails(json.useDetails);
        navigation.navigate('Buyer_Tab');
      }
      //   console.log('seller login sucessful',  json.authToken);
      // console.log('buyer login sucessful',  json.authToken);
      //   setBuyerAuthToken(json.authToken);
      //   navigation.navigate('Buyer_Tab');
      if (!json.succes){
        console.log(json.message);
      }
    }
  },[navigation,setUserDetails,setBuyerUserDetails,setBuyerAuthToken, mobileNumber, password, selectedRole,setAuthToken]);

  const [isDisabled, setIsDisabiled] = useState(true);
  useEffect(() => {
    if (
      mobileNumber !== '' &&
      password !== ''
    ) {
      setIsDisabiled(false);
    }
  }, [
    isDisabled,
    mobileNumber,
    password,
  ]);
  return (
    <View style={styles.container}>
      <Image
          style={styles.imageStyles}
          resizeMethod="auto"
          source={require('../images/Group-995.png')}
        />
      <Text style={styles.welcomeText}>Welcome Back</Text>
      <Text style={styles.enterDetailsText}>Please enter your details</Text>
      <View style={styles.inputField}>
      <TextInput
        style={styles.input}
        placeholder="Mobile number*"
        placeholderTextColor="#002058"
        onChangeText={onMobileNumberChange}
        value={mobileNumber}
      />
      </View>
      <View style={styles.passwordContainer}>
        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholder="Password*"
            placeholderTextColor="#002058"
            secureTextEntry={!showPassword}
            onChangeText={onPasswordChange}
            value={password}
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
      <TouchableOpacity disabled={isDisabled} onPress={onSignInClicked} style={[styles.buttonSignIn, isDisabled && styles.disabledSignInButton]}>
        <Text style={styles.buttonSignInText}>
          Sign In
        </Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Need to register? </Text>
        <TouchableOpacity onPress={onSignUpClicked}>
          <Text style={[styles.linkText]}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onForgetPasswordClicked}>
        <Text style={[styles.linkText]}>Forget Password</Text>
      </TouchableOpacity>
    </View>
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
    marginTop:moderateScale(3),
  },
  inputField: {
    borderColor: '#B5C7E6',
    borderWidth: horizontalScale(1),
    borderRadius: moderateScale(20),
    margin: moderateScale(10),
    width: moderateScale(330),
    height: moderateScale(40),
  },
  input:{
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
    margin: moderateScale(5),
  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#002058',
    fontFamily:'Ubuntu-Bold',
    fontSize:moderateScale(14),
  },
  imageStyles:{
    height:moderateScale(82),
    width:moderateScale(82),
  },
  visibility: {
    position: 'absolute',
    right: moderateScale(20),
    top: '50%',
    transform: [{translateY: -12.5}],
  },
  buttonSignIn: {
    backgroundColor: 'rgba(0, 32, 88, 1)',
    marginVertical: moderateScale(10),
    justifyContent: 'center',
    width: horizontalScale(165),
    height: verticalScale(40),
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
  registerText:{
    color:'#002058',
    fontFamily:'Ubuntu-Regular',
    fontSize:moderateScale(14),
  },
});
export default LoginPage;
