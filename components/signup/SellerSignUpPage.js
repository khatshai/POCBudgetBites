import React, {useState, useCallback, useEffect, useContext, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  findNodeHandle,
  Image,
} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../responsiveness/Metrics';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CssStyles from '../Styles';
import Context from '../contextfolder/ContextProvider';
import {registration} from '../../services/ProductServices';
import { OnSucessfullyRegister } from '../NotificationMessage';

function SellerSignUpPage({navigation}) {
  const [viewRef, setViewRef] = useState(null);
  const blurRef = useRef(null);

  useEffect(() => {
    setViewRef(findNodeHandle(blurRef.current));
  }, []);

  const {userSelectedLanguage, selectedRole, typeOfBussiness} =
    useContext(Context);
  //const [isSignInClicked, setIsSignInClicked] = useState(false);
  const [isDisabled, setIsDisabiled] = useState(true);
  const [registeredSucessfully, setRegisteredSucessfully] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const [userName, setUserName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [storeName, setStoreName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [location, setLocation] = useState({
    latitude: 23.2019342,
    longitude: 72.636885,
  });

  const [loading, setIsLoading] = useState(false);

  const onUserNameChange = text => {
    setUserName(text);
  };

  const onMobileNumChange = text => {
    setMobileNumber(text);
  };

  const onEmailChange = text => {
    setEmail(text);
  };

  const onPasswordChange = text => {
    setPassword(text);
  };

  const onConfirmPasswordChange = text => {
    setConfirmPassword(text);
  };

  const onStoreNameChange = text => {
    setStoreName(text);
  };

  const onAddress1Change = text => {
    setAddressLine1(text);
  };

  const onAddress2Change = text => {
    setAddressLine2(text);
  };

  const onCityChange = text => {
    setCity(text);
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

  useEffect(() => {
    if (
      userName !== '' &&
      mobileNumber !== '' &&
      password !== '' &&
      confirmPassword !== '' &&
      email !== '' &&
      addressLine1 !== '' &&
      addressLine2 !== '' &&
      city !== '' &&
      pincode !== '' &&
      storeName !== ''
    ) {
      setIsDisabiled(false);
    }
  }, [
    storeName,
    isDisabled,
    userName,
    mobileNumber,
    email,
    password,
    confirmPassword,
    addressLine1,
    addressLine2,
    city,
    pincode,
  ]);

  const handleSignup = useCallback(async () => {
    const userDetails = {
      preferredLanguage: userSelectedLanguage,
      userType: selectedRole,
      sellerType: typeOfBussiness,
      name: userName,
      mobile: mobileNumber,
      email: email,
      password: password,
      location: location,
      storeName: storeName,
      address1: addressLine1,
      address2: addressLine2,
      city: city,
      pincode: pincode,
      deviceToken:mobileNumber,
    };
    try {
      setIsLoading(true);
      const response = await registration({userDetails});
      if (response.ok) {
        const json = await response.json();
        setIsLoading(false);
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
    //navigation,
    userName,
    mobileNumber,
    email,
    password,
    addressLine1,
    addressLine2,
    city,
    pincode,
    location,
    typeOfBussiness,
    selectedRole,
    userSelectedLanguage,
    storeName,
  ]);

  const handleSignIn = () => {
    navigation.navigate('Login_In_Page');
  };

const onRegistrationComplete = () =>{
  navigation.navigate('Login_In_Page');
  setRegisteredSucessfully(false);
};

  return (
    <ScrollView
      contentContainerStyle={CssStyles.scrollContainer}
      keyboardShouldPersistTaps="handled">
      {
        <View style={styles.container}
       ref={blurRef}
        onLayout={() => setViewRef(findNodeHandle(blurRef.current))}
      >
        <Image
          style={styles.imageStyles}
          resizeMethod="auto"
          source={require('../../images/Group-995.png')}
        />
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.startedText}>Let's get started</Text>
        <View style={[styles.inputField, styles.widthinput]}>
          <TextInput
            placeholder="Name*"
            placeholderTextColor="#002058"
            onChangeText={onUserNameChange}
            value={userName}
            style={styles.input}
          />
        </View>
        <View style={[styles.inputField,styles.widthinput]}>
          <TextInput
            style={styles.input}
            placeholder="Mobile number*"
            placeholderTextColor="#002058"
            onChangeText={onMobileNumChange}
            value={mobileNumber}
          />
        </View>
        <View style={[styles.inputField, styles.widthinput]}>
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
          <View style={[styles.inputField, styles.widthinput]}>
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
              <Ionicons name="eye-outline" size={25} style={styles.iconColor} onChangeText={onPasswordChange}/>
            ) : (
              <Ionicons
                name="eye-off-outline"
                size={25}
                style={styles.iconColor}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <View style={[styles.inputField, styles.widthinput]}>
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
              <Ionicons name="eye-outline" size={25} style={styles.iconColor} />
            ) : (
              <Ionicons
                name="eye-off-outline"
                size={25}
                style={styles.iconColor}
              />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.locateText}>
          Let us locate you, so buyers can find you easily
        </Text>
        <TouchableOpacity style={styles.buttonLocate}>
          <MaterialIcons
            name="my-location"
            size={20}
            style={styles.iconColor}
          />
          <Text style={styles.buttonLocateText}>Locate me</Text>
        </TouchableOpacity>
        <View style={[styles.inputField, styles.widthinput]}>
          <TextInput
            style={styles.input}
            placeholder="Store Name*"
            placeholderTextColor="#002058"
            onChangeText={onStoreNameChange}
            value={storeName}
          />
        </View>
        <View style={[styles.inputField,styles.widthinput]}>
          <TextInput
            style={styles.input}
            placeholder="Adress Line*"
            placeholderTextColor="#002058"
            onChangeText={onAddress1Change}
            value={addressLine1}
          />
        </View>
        <View style={[styles.inputField,styles.widthinput]}>
          <TextInput
            style={styles.input}
            placeholder="Area*"
            placeholderTextColor="#002058"
            onChangeText={onAddress2Change}
            value={addressLine2}
          />
        </View>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <View style={{flexDirection:'row'}}>
        <View style={[styles.inputField,styles.width]}>
          <TextInput
            style={styles.input}
            placeholder="City*"
            placeholderTextColor="#002058"
            onChangeText={onCityChange}
            value={city}
          />
        </View>
        <View style={[styles.inputField,styles.width]}>
          <TextInput
            style={styles.input}
            placeholder="Pincode*"
            placeholderTextColor="#002058"
            onChangeText={onPincodeChange}
            value={pincode}
          />
        </View>
        </View>
        <TouchableOpacity
          disabled={isDisabled}
          onPress={handleSignup}
          style={[styles.buttonSignUp, isDisabled && styles.disabledSignUp]}>
          <Text style={styles.buttonSignUpText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text style={styles.alreadySignUpText}>Already Signed Up? </Text>
          <TouchableOpacity onPress={handleSignIn}>
            <Text style={[styles.linkText]}>Sign In</Text>
          </TouchableOpacity>
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
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F9FC',
    padding: moderateScale(30),
  },
  imageStyles:{
    height:moderateScale(82),
    width:moderateScale(82),
  },
  welcomeText: {
    color: '#002058',
    fontSize: moderateScale(20),
    textAlign: 'center',
    marginTop: verticalScale(15),
    fontFamily:'Ubuntu-Medium',
  },
  startedText: {
    color: '#002058',
    fontFamily:'Ubuntu-Regular',
    fontSize: moderateScale(12),
  },
  inputField: {
    borderColor: '#B5C7E6',
    borderWidth: horizontalScale(1),
    borderRadius: moderateScale(20),
    margin: moderateScale(5),
    height: moderateScale(40),
    justifyContent: 'center',
    fontFamily:'Ubuntu-Regular',
  },
  width:{
    width: moderateScale(160),
  },
  widthinput:{
    width: moderateScale(330),
  },
  input: {
    fontSize: moderateScale(14),
    marginLeft: horizontalScale(2),
    fontFamily:'Ubuntu-Regular',
  },
  passwordContainer: {
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
  visibility: {
    position: 'absolute',
    right: moderateScale(20),
    top: '50%',
    transform: [{translateY: -12.5}],
  },
  buttonLocate: {
    backgroundColor: '#F8F9FC',
    margin: '4%',
    width: horizontalScale(150),
    height: moderateScale(34),
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
    justifyContent: 'center',
    width: moderateScale(165),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    marginVertical: moderateScale(10),
  },
  buttonSignUpText: {
    color: '#F8F9FC',
    textAlign: 'center',
    fontSize: moderateScale(14),
    fontFamily:'Ubuntu-Medium',
  },
  buttonLocateText: {
    color: 'rgba(0, 32, 88, 1)',
    fontSize: moderateScale(14),
    marginLeft: moderateScale(10),
    fontFamily:'Ubuntu-Medium',
  },
  iconColor: {
    color: 'rgba(0, 32, 88, 1)',
  },
  disabledSignUp: {
    opacity: 0.6,
  },
  alreadySignUpText:{
    fontFamily:'Ubuntu-Regular',
    fontSize:moderateScale(14),
    color: 'rgba(0, 32, 88, 1)',
  },
});
export default SellerSignUpPage;
