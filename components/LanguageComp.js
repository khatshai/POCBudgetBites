import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import {BlurView} from '@react-native-community/blur';
import {
  StyleSheet,
  Text,
  View,
  findNodeHandle,
  Platform,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../responsiveness/Metrics';
import Icon from 'react-native-vector-icons/Ionicons';
import {NextButton} from './Buttons';
import CheckMark from '../images/CheckMark';
import CssStyles from './Styles';
import Context from './contextfolder/ContextProvider';
import {useTranslation} from 'react-i18next';
import '../locales';

const LanguageComp = ({navigation}) => {
  const {setUserSelectedLanguage} = useContext(Context);
  const {t, i18n} = useTranslation();

  const [lang, changeLang] = useState('en');
  //const selectedLanguageCode = i18n.language;
  const [viewRef, setViewRef] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    setViewRef(findNodeHandle(imageRef.current));
  }, []);

  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isDropDownClicked, setIsDropDownClicked] = useState(false);

  const languages = [
    {label: 'English (Default)', value: 'en'},

    {label: 'हिंदी', value: 'zh'},

    {label: 'മലയാളം', value: 'ml'},

    {label: 'ગુજરાતી', value: 'gr'},

    {label: 'मराठी', value: 'mr'},

    {label: 'தமிழ்', value: 'tm'},

    {label: 'తెలుగు', value: 'tu'},

    {label: 'اردو', value: 'ur'},

    {label: 'ਪੰਜਾਬੀ', value: 'pn'},

    {label: 'ಕನ್ನಡ', value: 'kn'},
  ];

  const handleOptionSelection = useCallback(
    option => {
      setIsDropDownClicked(false);
      setSelectedLanguage(option.value);
      setUserSelectedLanguage(option.label);
      changeLang(option.value);
      i18n.changeLanguage(option.value);
    },
    [setUserSelectedLanguage, i18n],
  );

  const handleNextButtonPress = () => {
    navigation.navigate('User_Type_Selection');
    //navigation.navigate('Home_Products');
    //navigation.navigate('Tab');
    //navigation.navigate('Login_In_Page');
  };

  const [isViewContentCentered, setIsViewContentCentered] = useState(false);

  const handleViewContentLayout = () => {
    setIsViewContentCentered(true);
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.blurredView}
        ref={imageRef}
        onLayout={() => setViewRef(findNodeHandle(imageRef.current))}>
        <View style={[styles.contentContainer]}>
          <Image
            style={styles.imageStyles}
            resizeMethod="auto"
            source={require('../images/Group-995.png')}
          />
          <Text style={styles.text1}>
            {t('translations.choose_prefer_lang')}
          </Text>
          <Text style={styles.text2}>{t('translations.lang_change_info')}</Text>
          <TouchableOpacity
            style={styles.dropDownSelector}
            onPress={() => setIsDropDownClicked(true)}>
            <Text style={styles.text2}>
              {languages.find(lang => lang.value === selectedLanguage)?.label}
            </Text>
            <Icon
              name="chevron-down-sharp"
              size={moderateScale(20)}
              style={styles.iconColor}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <NextButton
            onNextButtonPress={handleNextButtonPress}
            disablility={isDropDownClicked ? true : false}
          />
        </View>
      </View>
      {(viewRef || Platform.OS === 'ios') && isDropDownClicked && (
        <BlurView
          style={CssStyles.absolute}
          viewRef={viewRef}
          blurType="light"
          blurAmount={3}
          blurRadius={5}>
          <View
            style={[
              CssStyles.centeredView,
              isViewContentCentered && CssStyles.centeredViewOpacity,
            ]}
            onLayout={handleViewContentLayout}>
            <View style={styles.dropDownOptionsContainer}>
              <ScrollView contentContainerStyle={CssStyles.scrollContainer}>
                {languages.map((lang, key) => {
                  return (
                    <View key={key}>
                      <TouchableOpacity
                        style={styles.dropDownOptionsTextContainer}
                        onPress={() => handleOptionSelection(lang)}>
                        <Text style={styles.dropDownOptionsText} key={key}>
                          {lang.label}
                        </Text>
                        {selectedLanguage === lang.value && (
                          <View style={styles.checkMark}>
                            <CheckMark />
                          </View>
                        )}
                      </TouchableOpacity>
                      <Text style={CssStyles.horizontalLine} />
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </BlurView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  imageStyles: {
    height: moderateScale(82),
    width: moderateScale(82),
  },
  title: {
    color: 'blue',
    fontSize: 15,
  },
  blurredView: {
    backgroundColor: 'white',
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    padding: moderateScale(15),
    width: '100%',
  },
  text1: {
    fontSize: moderateScale(22),
    color: 'rgba(0, 32, 88, 1)',
    marginTop: verticalScale(20),
    fontFamily: 'Ubuntu-Bold',
    textAlign: 'center',
  },
  text2: {
    fontSize: moderateScale(12),
    color: 'rgba(0, 32, 88, 1)',
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: verticalScale(20),
    alignSelf: 'flex-end',
    backgroundColor: '#F8F9FC',
    paddingRight: moderateScale(20),
  },
  dropDownSelector: {
    width: moderateScale(290),
    height: moderateScale(50),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    marginTop: verticalScale(20),
    borderColor: '#B5C7E6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    paddingLeft: horizontalScale(15),
    paddingRight: horizontalScale(15),
    color: 'rgba(0, 32, 88, 1)',
  },
  iconColor: {
    color: 'rgba(0, 32, 88, 1)',
  },
  dropDownOptionsContainer: {
    width: moderateScale(345),
    height: moderateScale(510),
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(15),
    borderColor: '#e7efff',
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 3,
    shadowRadius: 5,
    elevation: 9,
    justifyContent: 'center',
  },
  alignment: {
    justifyContent: 'center',
  },
  dropDownOptionsTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropDownOptionsText: {
    fontSize: moderateScale(16),
    color: 'rgba(0, 32, 88, 1)',
    fontFamily: 'Ubuntu-Regular',
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(20),
  },
  checkMark: {
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginRight: 20,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default LanguageComp;
