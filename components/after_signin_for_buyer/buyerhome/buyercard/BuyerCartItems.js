import React, {useState, useEffect, useRef, useContext, useCallback} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  findNodeHandle,
  ScrollView,
} from 'react-native';
import CssStyles from '../../../Styles';
import {moderateScale} from '../../../../responsiveness/Metrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddedCardItems from './AddedCardItems';
import BuyerContext from '../../../contextfolder/BuyerContextProvider';
import {useNavigation} from '@react-navigation/native';
import {getCartDetails, requestForPickUp} from '../../../../services/BuyerProductServices';

function BuyerCartItems() {
  const {buyerAuthToken, updateBuyerOrderApi} = useContext(BuyerContext);

  const navigation = useNavigation();
  // const {isOrderRequestClicked, setIsOrderRequestClicked, } =
  //   useContext(BuyerContext);

  const [cartData, setCartData] = useState([]);

  const [viewRef, setViewRef] = useState(null);
  const blurRef = useRef(null);

  useEffect(() => {
    setViewRef(findNodeHandle(blurRef.current));
  }, []);

  const [timeDetails, setTimeDetails] = useState('');

  const onBackPressHandler = () => {
    navigation.navigate('Buyer_Tab');
  };

  const onTimeChange = text => {
    setTimeDetails(text);
  };

  const onRequestForPickUpPress = useCallback(async () => {
    const data = [...cartData];
    const requestingdata = {
      cartId: data[0]?.cartId,
      sellerId:data[0]?.data.sellerId,
      buyerComment:timeDetails,
      cartProductDetails:data[0]?.data.productDetails,
    };
    console.log(requestingdata,'requestingdatarequestingdata');
    const response = await requestForPickUp({buyerAuthToken, requestingdata});
    console.log(response,'response...............');
    if (response.succes){
      navigation.navigate('Buyer_Tab');
      updateBuyerOrderApi.reloadBuyerOrderData();
      console.log(response);
    }
    console.log('button clicked');
  },[buyerAuthToken, cartData, navigation, timeDetails, updateBuyerOrderApi]);

  useEffect(() => {
    const fetchCartDetails = async () => {
      const response = await getCartDetails({buyerAuthToken});
      console.log(response.cartList[0],'////////////////////////');
      setCartData(response.cartList);
    };
    fetchCartDetails();
  }, [buyerAuthToken]);

  return (
    <View style={styles.container}>
      <View style={CssStyles.topTabcontainer}>
        <View style={styles.flex}>
          <View style={styles.heartContainer}>
            <TouchableOpacity
              onPress={onBackPressHandler}
              style={styles.backArrowBg}>
              <Ionicons name="chevron-back" size={moderateScale(25)} />
            </TouchableOpacity>
          </View>
          <View style={[CssStyles.topTabCenterContainer, styles.padding]}>
            <Text style={styles.headerText}>My Cart</Text>
          </View>
        </View>
      </View>
      <View style={styles.containerSpace}>
      <View style={styles.flexAlign}>
            <Text style={styles.tittle}>My Cart</Text>
            <Text>______________________________________________</Text>
          </View>
        <ScrollView contentContainerStyle={styles.storeDetailsContainer}>
          {cartData
            ? cartData.map((cartItem, index) => (
                <View style={styles.padding} key={index}>
                  <View>
                    <Text style={styles.tittle}>Your Items</Text>
                    <AddedCardItems
                      productDetails={cartItem.data.productDetails}
                    />
                  </View>
                  <View style={styles.padding}>
                    <Text style={styles.passage1}>
                      Pick-Up Location Details
                    </Text>
                    <View style={[styles.itemsContanier, styles.padding]}>
                      <Text style={styles.passage3}>Shop Name: {cartItem.data.seller_details.storeName}</Text>
                      <Text style={styles.passage3}>Address: {cartItem.data.seller_details.address2}</Text>
                      <Text style={styles.passage3}>Area: {cartItem.data.seller_details.address1}</Text>
                      <Text style={styles.passage3}>City: {cartItem.data.seller_details.city}</Text>
                      <View style={styles.alignItems}>
                        <View style={styles.location}>
                          <Text style={styles.passage4}>
                            1.2 km away from your location
                          </Text>
                        </View>
                        <View >
                          <TouchableOpacity>
                            <Text style={styles.mapText}>View on Map</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View>
                    <View style={styles.padding}>
                      <Text style={styles.passage1}>Pick-Up Time Details*</Text>
                      <TextInput
                        placeholderTextColor="#B5C7E6"
                        style={styles.inputContanier}
                        placeholder="Enter your feasible pick-up time and date here"
                        onChangeText={onTimeChange}
                        value={timeDetails}
                      />
                    </View>
                  </View>
                  <View >
                    <Text style={styles.passage1}>Cancellation</Text>
                    <View style={[styles.cancellationContainer]}>
                      <Text style={styles.cancellationPassageText}>
                        We humbly request you to go and purchase your order and
                        contribute towards a sustainable future. However you are
                        free to cancel your order, but please do it as early as
                        possible as we are dealing with products with short
                        expiries.
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            : null}
        </ScrollView>
        <View style={styles.bottomTabcontainer}>
          <TouchableOpacity
            onPress={onRequestForPickUpPress}
            style={styles.buttonBookOrder}>
            <Text style={styles.buttonBookOrderText}>Request for Pick-Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FC',
    flex: 1,
  },
  headerText: {
    color: '#42629A',
    fontSize: moderateScale(14),
    fontFamily: 'Ubuntu-Medium',
  },
  inputContanier: {
    backgroundColor: '#FFFFFF',
    height: moderateScale(56),
    width: moderateScale(345),
    borderRadius: moderateScale(15),
    justifyContent: 'space-between',
    fontFamily: 'Ubuntu-Regular',
  },
  flexAlign: {
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignItems:{
    alignItems:'center',
  },
  singleProductContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  location: {
    backgroundColor: '#F9F9F9',
    height: moderateScale(25),
    width: moderateScale(226),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(8),
  },
  passage4: {
    fontSize: moderateScale(12),
    fontFamily: 'Ubuntu-Regular',
    color: '#002058',
  },
  passage1: {
    fontSize: moderateScale(16),
    fontFamily: 'Ubuntu-Medium',
    color: '#002058',
  },
  passage3: {
    fontSize: moderateScale(14),
    fontFamily: 'Ubuntu-Regular',
    color: '#002058',
  },
  mapText: {
    textDecorationLine: 'underline',
    color: '#FF5700',
    fontSize: moderateScale(14),
    fontFamily: 'Ubuntu-Medium',
  },
  containerAlign: {
    backgroundColor: '#FFFFFF',
    minheight: moderateScale(203),
    width: moderateScale(345),
    marginVertical: moderateScale(10),
    borderRadius: moderateScale(10),
    padding: moderateScale(5),
    zIndex: 20,
    alignContent: 'center',
  },
  itemsContanier: {
    backgroundColor: '#FFFFFF',
    minheight: moderateScale(180),
    width: moderateScale(345),
    borderRadius: moderateScale(15),
    justifyContent: 'space-between',
  },
  topContent: {
    height: moderateScale(100),
    flexDirection: 'row',
    width: '100%',
  },
  imageStyles: {
    height: moderateScale(122),
    width: moderateScale(122),
    borderRadius: moderateScale(20),
    marginTop: moderateScale(10),
  },
  padding: {
    padding: moderateScale(15),
  },
  iconsContainer: {
    justifyContent: 'center',
    margin: moderateScale(10),
  },
  flex: {
    flexDirection: 'row',
    height: moderateScale(80),
  },
  heartContainer: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    margin: moderateScale(5),
  },
  backArrowBg: {
    backgroundColor: '#EAEFF8',
    height: moderateScale(40),
    width: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(20),
  },
  storeDetailsContainer: {
    alignItems: 'center',
    backgroundColor: '#F8F9FC',
  },
  containerSpace: {
    justifyContent: 'space-between',
    flex: 1,
  },
  locationContainer: {
    display: 'flex',
    borderColor: '#002058',
    borderWidth: moderateScale(2),
    height: moderateScale(26),
    width: moderateScale(226),
    borderRadius: moderateScale(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldContainer: {
    display: 'flex',
  },
  fieldSelector: {
    height: moderateScale(30),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: '#B5C7E6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'rgba(0, 32, 88, 1)',
    margin: moderateScale(10),
    alignItems: 'center',
    width: moderateScale(314),
  },
  iconBG: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: moderateScale(5),
    paddingRight: moderateScale(5),
    borderRadius: moderateScale(20),
  },
  iconBGColor: {
    backgroundColor: '#EAEFF8',
    height: moderateScale(30),
  },
  tittle: {
    color: '#002058',
    fontFamily: 'Ubuntu-Bold',
    fontSize: moderateScale(16),
    margin:moderateScale(10),
  },
  margin: {
    margin: moderateScale(10),
  },
  cancellationContainer: {
    backgroundColor: '#EAEFF8',
    height: moderateScale(84),
    width: moderateScale(345),
    borderRadius: moderateScale(15),
    padding: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancellationPassageText: {
    color: '#42629A',
    fontSize: moderateScale(11),
    fontFamily: 'Ubuntu-Regular',
  },
  passage2Bold: {
    fontFamily: 'Ubuntu-Bold',
    color: '#002058',
    fontSize: moderateScale(12),
  },
  alignment: {
    textAlign: 'center',
  },
  productTypeContainer: {
    height: moderateScale(0),
    minwidth: moderateScale(78),
    backgroundColor: '#F9F9F9',
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartContainer: {
    position: 'absolute',
    bottom: moderateScale(60),
    right: moderateScale(20),
  },
  buttonBookOrder: {
    backgroundColor: '#FF5700',
    justifyContent: 'center',
    width: moderateScale(345),
    height: moderateScale(34),
    borderRadius: moderateScale(20),
    marginLeft: moderateScale(20),
  },
  buttonBookOrderText: {
    color: '#F8F9FC',
    textAlign: 'center',
    fontSize: moderateScale(14),
    fontFamily: 'Ubuntu-Medium',
    margin: moderateScale(10),
  },
  bottomTabcontainer: {
    backgroundColor: '#FFFFFF',
    padding: moderateScale(15),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    borderTopWidth: 2, // Add a bottom border
    borderColor: 'rgba(0, 0, 0, 0.1)', // Border color for the shadow
    shadowOffset: {width: 0, height: moderateScale(4)}, // Positive height for bottom shadow
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default BuyerCartItems;
