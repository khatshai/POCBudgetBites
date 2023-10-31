import React, {useState, useContext,useRef, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  findNodeHandle,
} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../responsiveness/Metrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import Context from '../contextfolder/ContextProvider';
import {registration} from '../../services/ProductServices';
import { OnSucessfullyRegister } from '../NotificationMessage';

function BuyerSignUpPage({navigation}) {
  const {userSelectedLanguage, selectedRole, typeOfBussiness} = useContext(Context);

  const [viewRef, setViewRef] = useState(null);
  const blurRef = useRef(null);

  useEffect(() => {
    setViewRef(findNodeHandle(blurRef.current));
  }, []);

  const [isDisabled, setIsDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const [userName, setUserName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [ngoEmail, setNgoEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pincode, setPincode] = useState('');

  const [isCheckboxChecked, setIsCheckBoxChecked] = useState(false);

  const [registeredSucessfully, setRegisteredSucessfully] = useState(false);

  useEffect(() => {
    if (
      userName !== '' &&
      mobileNumber !== '' &&
      password !== '' &&
      confirmPassword !== '' &&
      email !== '' &&
      pincode !== ''
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [userName, mobileNumber, email, password, confirmPassword, pincode]);

  const onUserNameChange = text => {
    setUserName(text);
  };

  const onMobileNumChange = text => {
    setMobileNumber(text);
  };

  const onEmailChange = text => {
    setEmail(text);
  };

  const onNgoEmailChange = text => {
    setNgoEmail(text);
  };

  const onPasswordChange = text => {
    setPassword(text);
  };

  const onConfirmPasswordChange = text => {
    setConfirmPassword(text);
  };

  const onPincodeChange = text => {
    setPincode(text);
  };

  const onTogglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const onToggleRetypePasswordVisibility = () => {
    setShowRetypePassword(prevShowPassword => !prevShowPassword);
  };

  const toggleCheckBox = () => {
    setIsCheckBoxChecked(!isCheckboxChecked);
  };

  const handleSignIn = () => {
    navigation.navigate('Login_In_Page');
  };

  const handleSignup = useCallback(async () => {
    const userDetails = {
      preferredLanguage: userSelectedLanguage,
      userType: selectedRole,
      name: userName,
      mobile: mobileNumber,
      email: email,
      password: password,
      pincode: pincode,
      buyerType: typeOfBussiness,
      deviceToken:mobileNumber,
    };
    try {
      const response = await registration({userDetails});
      if (response.ok) {
        console.log(response,'responseresponseresponse');
        const json = await response.json();
        console.log(json, 'BUYER SIGNUP reg');
        //navigation.navigate('Login_In_Page');
        if (json.succes){
          setRegisteredSucessfully(true);
          //navigation.navigate('Login_In_Page');
        } else {
          setRegisteredSucessfully(json.succes);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [
    email,
    mobileNumber,
    password,
    pincode,
    selectedRole,
    //navigation,
    userName,
    userSelectedLanguage,
    typeOfBussiness,
  ]);

  const onRegistrationComplete = () =>{
    navigation.navigate('Login_In_Page');
    setRegisteredSucessfully(false);
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.scrollContainer, styles.centerContainer]}
      keyboardShouldPersistTaps="handled">
      {<View style={styles.container}
      ref={blurRef}
        onLayout={() => setViewRef(findNodeHandle(blurRef.current))}
      >
        <View style={styles.centerContainer}>
        <Image
          style={styles.imageStyles}
          resizeMethod="auto"
          source={require('../../images/Group-995.png')}
        />
        </View>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.startedText}>Let's get started</Text>
        <View style={styles.centerContainer}>
          <View style={styles.inputField}>
            <TextInput
              placeholder="Name*"
              placeholderTextColor="#002058"
              onChangeText={onUserNameChange}
              value={userName}
              style={styles.input}
            />
          </View>
          <View style={styles.inputField}>
            <TextInput
              style={styles.input}
              placeholder="Mobile number*"
              placeholderTextColor="#002058"
              onChangeText={onMobileNumChange}
              value={mobileNumber}
            />
          </View>
          <View style={styles.inputField}>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              placeholder="Email*"
              placeholderTextColor="#002058"
              onChangeText={onEmailChange}
              value={email}
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
                <Ionicons
                  name="eye-outline"
                  size={30}
                  style={styles.iconColor}
                />
              ) : (
                <Ionicons
                  name="eye-off-outline"
                  size={30}
                  style={styles.iconColor}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.passwordContainer}>
            <View style={styles.inputField}>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password*"
                placeholderTextColor="#002058"
                secureTextEntry={!showRetypePassword}
                onChangeText={onConfirmPasswordChange}
                value={confirmPassword}
              />
            </View>
            <TouchableOpacity
              style={styles.visibility}
              onPress={onToggleRetypePasswordVisibility}>
              {showRetypePassword ? (
                <Ionicons
                  name="eye-outline"
                  size={30}
                  style={styles.iconColor}
                />
              ) : (
                <Ionicons
                  name="eye-off-outline"
                  size={30}
                  style={styles.iconColor}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.inputField}>
            <TextInput
              style={styles.input}
              placeholder="Pincode*"
              placeholderTextColor="#002058"
              onChangeText={onPincodeChange}
              value={pincode}
            />
          </View>
        </View>
        <View style={styles.checkBoxStyles}>
          <CheckBox
            value={isCheckboxChecked}
            onValueChange={toggleCheckBox}
            tintColors={{
              true: 'rgba(0, 32, 88, 1)',
              false: 'rgba(0, 32, 88, 1)',
            }}
            style={styles.customCheckBox}
          />
          <Text style={styles.checkBoxText}>Register as an NGO Volunteer</Text>
        </View>
        {isCheckboxChecked && (
          <>
            <View style={styles.centerContainer}>
              <View style={styles.inputField}>
                <TextInput
                  style={styles.input}
                  keyboardType="email-address"
                  placeholder="NGO Email*"
                  placeholderTextColor="#002058"
                  onChangeText={onNgoEmailChange}
                  value={ngoEmail}
                />
              </View>
            </View>
            <Text style={[styles.checkBoxText, styles.textMargin]}>
              Attach government provided certificate. Max 500kb.
            </Text>
            <View style={styles.checkBoxStyles}>
              <TouchableOpacity>
                <Ionicons
                  name="add-circle-outline"
                  size={50}
                  style={styles.iconColor}
                />
              </TouchableOpacity>
              <Text style={[styles.checkBoxText, styles.textMargin]}>
                Add File
              </Text>
            </View>
          </>
        )}
        <View style={styles.centerContainer}>
          <TouchableOpacity
            isDisabled={isDisabled}
            onPress={handleSignup}
            style={[
              styles.buttonSignUp,
              isDisabled && styles.disabledSignUpButton,
            ]}>
            <Text style={styles.buttonSignUpText}>Sign up</Text>
          </TouchableOpacity>
          <View style={styles.registerContainer}>
            <Text style={styles.alreadySignUpText}>Already Signed Up? </Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={[styles.linkText]}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>}
      {registeredSucessfully &&
        <OnSucessfullyRegister onRegistrationComplete={onRegistrationComplete} viewRef={viewRef}/>
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    overflow: 'scroll',
    backgroundColor: '#F8F9FC',
  },
  container: {
    flex: 1,
    padding: moderateScale(10),
    justifyContent:'center',
    alignItems:'center',
  },
  imageStyles:{
    height:moderateScale(82),
    width:moderateScale(82),
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent:'center',
  },
  welcomeText: {
    color: '#002058',
    fontSize: moderateScale(20),
    textAlign: 'center',
    marginTop: verticalScale(20),
    fontFamily:'Ubuntu-Medium',
  },
  startedText: {
    color: '#002058',
    fontFamily:'Ubuntu-Regular',
    fontSize: moderateScale(12),
    textAlign: 'center',
  },
  inputField: {
    borderColor: '#B5C7E6',
    borderWidth: horizontalScale(1),
    borderRadius: moderateScale(20),
    margin: moderateScale(5),
    width: moderateScale(330),
    height: moderateScale(40),
  },
  input: {
    fontSize: moderateScale(14),
    marginLeft: horizontalScale(2),
    fontFamily:'Ubuntu-Regular',
  },
  confirmPasswordContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  locateText: {
    textAlign: 'center',
    color: '#002058',
    fontSize: moderateScale(12),
    marginTop: verticalScale(20),
    fontFamily:'Ubuntu-Regular',
  },
  registerContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: moderateScale(10),
  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#002058',
    fontFamily:'Ubuntu-Bold',
    fontSize:moderateScale(14),
  },
  alreadySignUpText:{
    fontFamily:'Ubuntu-Regular',
    fontSize:moderateScale(14),
    color: 'rgba(0, 32, 88, 1)',
  },
  visibility: {
    position: 'absolute',
    right: moderateScale(20),
    top: '50%',
    transform: [{translateY: -12.5}],
  },
  buttonLocate: {
    backgroundColor: '#F8F9FC',
    margin: '4%',
    width: moderateScale(165),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(2),
    borderColor: 'rgba(0, 32, 88, 1)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSignUp: {
    backgroundColor: 'rgba(0, 32, 88, 1)',
    marginVertical: moderateScale(10),
    justifyContent: 'center',
    width: moderateScale(165),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
  },
  buttonSignUpText: {
    color: '#F8F9FC',
    textAlign: 'center',
    fontSize: 20,
  },
  buttonLocateText: {
    color: 'rgba(0, 32, 88, 1)',
    fontSize: 20,
    marginLeft: moderateScale(10),
  },
  disabledSignUpButton: {
    opacity: 0.5,
  },
  iconColor: {
    color: 'rgba(0, 32, 88, 1)',
  },
  checkBoxStyles: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(10),
    alignItems: 'center',
  },
  checkBoxText: {
    color: 'rgba(0, 32, 88, 1)',
    fontSize: moderateScale(16),
  },
  textMargin: {
    marginHorizontal: moderateScale(10),
  },
});
export default BuyerSignUpPage;
