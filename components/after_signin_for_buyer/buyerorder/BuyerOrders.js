import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {BuyerHomeTopTab} from '../buyerhome/BuyerHomeTopTab';
import {moderateScale} from '../../../responsiveness/Metrics';
import {Group, LineSvg} from '../../../images/sellericons/BookingSVGs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LocationSVG from '../../../images/sellericons/LocationSVG';
import {getBuyerOrderDetails} from '../../../services/BuyerProductServices';
import BuyerContext from '../../contextfolder/BuyerContextProvider';

function BuyerOrders() {
  const {buyerAuthToken, setUpdateBuyerOrderApi} = useContext(BuyerContext);

  const [buyerOrderDetails, setBuyerOrderDetails] = useState([]);
  console.log(buyerOrderDetails, 'buyerOrderDetails');

  const arr = [1, 2, 3, 4, 5];

  const [rating, setRating] = useState(0);

  const handleStarPress = selectedRating => {
    if (selectedRating === rating) {
      setRating(0);
    } else {
      setRating(selectedRating);
    }
  };

  // const fetchOrderDetails = useCallback(async ()=>{
  //   const response = await getBuyerOrderDetails({buyerAuthToken});
  //   if (response.succes){
  //     setBuyerOrderDetails(response.orders);
  //   }
  // },[buyerAuthToken]);

  // useEffect(()=>{
  //   fetchOrderDetails();
  // },[fetchOrderDetails]);

  // useEffect(()=>{
  const fetchOrderDetails = useCallback(async () => {
    const response = await getBuyerOrderDetails({buyerAuthToken});
    if (response.succes) {
      setBuyerOrderDetails(response.orders);
    }
  }, [buyerAuthToken]);
  //fetchOrderDetails();
  // },[buyerAuthToken]);

  useEffect(() => {
    fetchOrderDetails();
    setUpdateBuyerOrderApi({reloadBuyerOrderData: fetchOrderDetails});
  }, [fetchOrderDetails, setUpdateBuyerOrderApi]);

  // const readyForPickUp = useCallback(async (orders) => {
  //   const arr = [];
  //   orders.productDetails.forEach((value)=>{
  //     console.log(value.product_id);
  //   });
  //   const response = await orderPickedUp({buyerAuthToken});
  // },[buyerAuthToken]);

  return (
    <View style={styles.container}>
      <BuyerHomeTopTab />
      <ScrollView>
        {buyerOrderDetails
          ? buyerOrderDetails.map((orderDetails, index) => {
            let totalAmount = 0;
              return (<View key={index} style={styles.pickupReqContainer}>
                <View style={[styles.padding, styles.flexAlign]}>
                  <View>
                    <Text style={styles.title}>
                      {orderDetails.seller_details.storeName}
                    </Text>
                    <Text style={styles.passage1}>
                      {orderDetails.seller_details.address1},{' '}
                      {orderDetails.seller_details.city}
                    </Text>
                  </View>
                  <View>
                    {orderDetails.orderStatus === 'Pickup Completed' && (
                      <View style={styles.bg3}>
                        <Text style={styles.passage2}>Order Collected</Text>
                      </View>
                    )}
                    {orderDetails.orderStatus === 'Partially Completed' && (
                      <View style={styles.bg3}>
                        <Text style={styles.passage2}>
                          Order Partially Collected
                        </Text>
                      </View>
                    )}
                    {orderDetails.orderStatus === 'Pickup Requested' && (
                      <View style={styles.bg1}>
                        <Text style={styles.passage2}>Pick-Up Requested</Text>
                      </View>
                    )}
                    {orderDetails.orderStatus === 'Pickup Accepted' && (
                      <View style={styles.bg2}>
                        <Text style={styles.passage2}>Ready for Pick-Up</Text>
                      </View>
                    )}
                    {orderDetails.orderStatus === 'Partially Accepted' && (
                      <View style={styles.bg2}>
                        <Text style={styles.passage2}>Partially Accepted</Text>
                      </View>
                    )}
                    {orderDetails.orderStatus !== 'Pickup Completed' && (
                      <TouchableOpacity>
                        <Text style={[styles.passage3, styles.textdecorate]}>
                          Cancel Order
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                <LineSvg />
                {orderDetails.productDetails.map((value, key) => {
                  totalAmount += value.product_discount_price * value.product_quantity;
                  return (
                    <View key={key} style={styles.padding}>
                      <Text style={styles.passage4}>
                        {value.product_quantity} x {value.product_name}
                      </Text>
                    </View>
                  );
                })}
                <LineSvg />
                <View style={[styles.padding, styles.flexAlign]}>
                  <View>
                    <Text style={styles.passage5}>Total {totalAmount} INR</Text>
                    <Text style={styles.passage4}>Ordered on:Date, Time</Text>
                  </View>
                  <View style={styles.iconsContainer}>
                    <TouchableOpacity style={styles.bgIconsColor}>
                      {/* <MaterialCommunityIcons color="#002058" size={moderateScale(20)} name="message"/> */}
                      <LocationSVG />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bgIconsColor}>
                      <MaterialCommunityIcons
                        color="#002058"
                        size={moderateScale(20)}
                        name="message"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {/* {orderDetails.orderStatus === 'Ready for Pick-Up' || orderDetails.orderStatus === 'Partially Accepted' && <>
      <LineSvg/>
    <View style={[styles.iconsContainer, styles.contentDisplay, styles.padding]}>
          <Text style={styles.passageText}>Order Picked Up?</Text>
          <TouchableOpacity style={[styles.buttons, styles.yesButton]}>
          <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, styles.noButton]}>
          <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
    </View>
    </>} */}
                {(orderDetails.orderStatus === 'Partially Completed' ||
                  orderDetails.orderStatus === 'Pickup Completed') && (
                  <>
                    <LineSvg />
                    <View style={[styles.flexAlign, styles.padding]}>
                      <View style={styles.iconsContainer}>
                        <Group />
                        <Text style={styles.passage1}>Confidence Rating</Text>
                        <MaterialCommunityIcons
                          color="#42629A"
                          size={moderateScale(20)}
                          name="information"
                        />
                      </View>
                      <View style={styles.iconsContainer}>
                        {arr.map(i => (
                          <TouchableOpacity
                            key={i}
                            onPress={() => handleStarPress(i)}>
                            <MaterialCommunityIcons
                              name={i <= rating ? 'star' : 'star-outline'}
                              color={i <= rating ? '#FF5700' : '#42629A'}
                              size={20}
                            />
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </>
                )}
              </View>);
            })
          : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },
  pickupReqContainer: {
    minheight: moderateScale(154),
    width: moderateScale(345),
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(10),
    alignSelf: 'center',
    margin: moderateScale(10),
  },
  flexAlign: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  padding: {
    padding: moderateScale(10),
  },
  bgIconsColor: {
    backgroundColor: '#EAEFF8',
    height: moderateScale(40),
    width: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(20),
    margin: moderateScale(5),
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  contentDisplay: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttons: {
    height: moderateScale(24),
    width: moderateScale(42),
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#009E83',
    margin: moderateScale(5),
  },
  noButton: {
    backgroundColor: '#CF0000',
    margin: moderateScale(5),
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Ubuntu-Medium',
    fontSize: moderateScale(12),
  },
  passageText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: moderateScale(14),
    color: '#002058',
    margin: moderateScale(5),
  },
  title: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: moderateScale(18),
    color: '#002058',
  },
  passage1: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: moderateScale(14),
    color: '#002058',
  },
  bg1: {
    height: moderateScale(21),
    width: moderateScale(102),
    backgroundColor: '#EAEFF8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
  },
  bg2: {
    height: moderateScale(21),
    width: moderateScale(102),
    backgroundColor: '#CEF9EE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
  },
  bg3: {
    height: moderateScale(21),
    width: moderateScale(102),
    backgroundColor: '#F0FFF1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
  },
  passage2: {
    color: '#002058',
    fontSize: moderateScale(10),
    fontFamily: 'Ubuntu-Regular',
  },
  passage3: {
    color: '#42629A',
    fontSize: moderateScale(11),
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'center',
  },
  textdecorate: {
    textDecorationLine: 'underline',
  },
  passage4: {
    color: '#42629A',
    fontSize: moderateScale(13),
    fontFamily: 'Ubuntu-Regular',
  },
  passage5: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: moderateScale(14),
    color: '#002058',
  },
});

export default BuyerOrders;
