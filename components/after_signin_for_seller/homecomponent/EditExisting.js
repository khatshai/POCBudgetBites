import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  findNodeHandle,
  Platform,
} from 'react-native';
import {moderateScale, verticalScale} from '../../../responsiveness/Metrics';
import CancelOkButtons from '../CancelOkButtons';
import CssStyles from '../../Styles';
import {
  ExpiryDate,
  MRPSelector,
  DiscountPercentage,
  PriceCalculation,
  UnitsSelection,
  QuantitySelector,
} from '../Fields';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';
import PublishProducts from '../PublishProducts';
import {useNavigation, useRoute} from '@react-navigation/native';
import Context from '../../contextfolder/ContextProvider';
import { OnAlertIcon } from '../../NotificationMessage';

const EditExisting = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    productWeight,
    productType,
    productName,
    productUnitSelection,
    setProductMrp,
    setProductDiscount,
    setProductGiftQuantity,
    setProductDiscountedPrice,
    setProductUnitSelection,
    setProductSellQuantity,
    setProductExpirydate,
  } = useContext(Context);

  const [isScroll, setIsScroll] = useState(true);
  const {item, currentDiscount} = route.params;
  const [isPublishClicked, setIsPublishClicked] = useState(false);
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

  const onIsScrollChange = bool => {
    setIsScroll(bool);
  };

  const onBackPressHandler = () => {
    setProductMrp(null);
    setProductDiscount(null);
    setProductDiscountedPrice(null);
    setProductUnitSelection('');
    setProductSellQuantity(null);
    setProductExpirydate('');
    setProductGiftQuantity(null);
    navigation.navigate('Tab');
    setIsPublishClicked(false);
    setIsSaveClicked(false);
  };

  const onSaveChangesHandler = () => {
    setIsSaveClicked(true);
    setIsPublishClicked(false);
  };

  const onPublishHandler = () => {
    // if (
    //   item.product_expiry_date === '' ||
    //   item.product_quantity ||
    //   item.product_discount_price
    // ) {
    //   setIsPublishClicked(true);
    //   setIsAlert(false);
    // } else {
    //   setIsPublishClicked(false);
    //   setIsAlert(true);
    // }
    setIsPublishClicked(true);
    setIsSaveClicked(false);
  };

  const alertOkClicked = () => {
    setIsAlert(false);
  };

  const [viewRef, setViewRef] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    setViewRef(findNodeHandle(imageRef.current));
  }, []);

  const [isViewContentCentered, setIsViewContentCentered] = useState(false);

  const handleViewContentLayout = () => {
    setIsViewContentCentered(true);
  };

  return (
    <View style={styles.container}>
      <View
        style={[CssStyles.topTabcontainer, styles.flex, styles.padding]}
        ref={imageRef}
        onLayout={() => setViewRef(findNodeHandle(imageRef.current))}>
        <TouchableOpacity
          onPress={onBackPressHandler}
          style={styles.imageBackGround}>
          <Ionicons
            name="chevron-back-sharp"
            size={moderateScale(20)}
            style={styles.iconStyles}
          />
        </TouchableOpacity>
        <View style={CssStyles.topTabCenterContainer}>
          <Text style={styles.locationText}>Edit Product</Text>
        </View>
        <TouchableOpacity style={styles.imageBackGround}>
          <MaterialCommunityIcons
            size={moderateScale(25)}
            style={styles.iconStyles}
            name="bell-outline"
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        scrollEnabled={isScroll}
        contentContainerStyle={CssStyles.scrollContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.imageStyles}
              resizeMethod="auto"
              source={
                item.product_image
                  ? {uri: item.product_image}
                  : require('../../../images/EmptyImage.jpg')
              }
            />
          </View>
          <Text style={styles.foodTypeText}>{productType}</Text>
          <View style={styles.passageConStyles}>
            <Text style={styles.title}>{productName}</Text>
            <Text style={styles.passage}>
              Weight: {productWeight}
              {productUnitSelection}
            </Text>
          </View>
          <ExpiryDate />
          <MRPSelector />
          <DiscountPercentage />
          <LinearGradient
            colors={['#869FCB', '#002058']}
            style={styles.linearGradientStyles}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <View>
              <Text style={styles.discountText}>
                Current discount Trend {currentDiscount}%
              </Text>
            </View>
          </LinearGradient>
          <PriceCalculation />
          <UnitsSelection onIsScrollChange={onIsScrollChange} />
          <QuantitySelector />
        </View>
      </ScrollView>
      <View style={styles.bottomTabcontainer}>
        <CancelOkButtons
          cancelText={'Save Changes'}
          okText={'Publish'}
          cancleClick={onSaveChangesHandler}
          okClick={onPublishHandler}
        />
      </View>
      {(viewRef || Platform.OS === 'ios') && isPublishClicked && (
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
            <PublishProducts item={item} />
          </View>
        </BlurView>
      )}
      {(viewRef || Platform.OS === 'ios') && isSaveClicked && (
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
            <PublishProducts item={item} isSaveClicked={'SaveClicked'} />
          </View>
        </BlurView>
      )}
      {/* {isAlert && <OnAlertIcon viewRef={viewRef} alertOkClicked={alertOkClicked}/>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },
  padding: {
    padding: moderateScale(25),
  },
  iconStyles: {
    color: 'rgba(0, 32, 88, 1)',
  },
  imgContainer: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: verticalScale(20),
  },
  imageStyles: {
    height: moderateScale(122),
    width: moderateScale(122),
    borderRadius: moderateScale(10),
  },
  imageBackGround: {
    backgroundColor: '#EAEFF8',
    height: moderateScale(40),
    width: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(20),
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    margin: moderateScale(30),
    padding: moderateScale(20),
    borderRadius: moderateScale(15),
  },
  foodTypeText: {
    color: '#002058',
    fontFamily: 'Ubuntu-Medium',
    fontSize: moderateScale(11),
  },
  passageConStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: 'rgba(0, 32, 88, 1)',
    fontSize: moderateScale(20),
    margin: moderateScale(2),
    fontFamily: 'Ubuntu-Medium',
  },
  passage: {
    color: '#002058',
    fontSize: moderateScale(14),
    textAlign: 'center',
    margin: moderateScale(2),
    fontFamily: 'Ubuntu-Regular',
  },
  linearGradientStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(20),
    marginVertical: moderateScale(3),
    height: moderateScale(24),
    width: moderateScale(174),
  },
  discountText: {
    color: '#FFFFFF',
    fontFamily: 'Ubuntu-Medium',
    fontSize: moderateScale(12),
  },
  bottomTabcontainer: {
    backgroundColor: '#FFFFFF',
    padding: moderateScale(15),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    borderTopWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: moderateScale(4)},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    position: 'relative',
  },
  flex: {
    flexDirection: 'row',
  },
  locationText: {
    color: '#002058',
    fontSize: moderateScale(14),
    fontFamily: 'Ubuntu-Regular',
  },
});

export default EditExisting;
