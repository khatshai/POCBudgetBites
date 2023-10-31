import React, {useCallback, useContext, useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import CssStyles from '../../Styles';
import {moderateScale} from '../../../responsiveness/Metrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Group, LineSvg} from '../../../images/sellericons/BookingSVGs';
import {
getSellerOrders,
  orderAccepted,
  orderPickedUp,
} from '../../../services/ProductServices';
import Context from '../../contextfolder/ContextProvider';

function Bookings() {
  const {authToken} = useContext(Context);

  const route = useRoute();
  const {productData} = route?.params;

  const [orderDetails, setOrderDetails] = useState([]);

  const navigation = useNavigation();
  const onBackPressHandler = () => {
    navigation.goBack();
  };

  const arr = [1, 2, 3, 4, 5];

  const [rating, setRating] = useState(0);

  const handleStarPress = selectedRating => {
    if (selectedRating === rating) {
      setRating(0);
    } else {
      setRating(selectedRating);
    }
  };
  const fetchOrderDetails = useCallback(async () => {
    const response = await getSellerOrders({authToken, productData});
    if (response.succes) {
      setOrderDetails(response.order);
      console.log(response.order,'response.orderresponse.orderresponse.order');
    }
  }, [authToken, productData]);

  useEffect(() => {
    fetchOrderDetails();
  }, [fetchOrderDetails]);

  const onYesPress = useCallback(
    async (orderId, productId, docId, status) => {
      console.log(status, '..................');
      const details = {
        order_id: orderId,
        product_id: productId,
        document_id: docId,
      };
      if (status === 'Pickup Requested') {
        const orderAccept = await orderAccepted({authToken, details});
        fetchOrderDetails();
        console.log(orderAccept);
      }
      if (status === 'Pickup Accepted') {
        const orderPicked = await orderPickedUp({authToken, details});
        fetchOrderDetails();
        console.log(orderPicked, '......');
      }
    },
    [authToken, fetchOrderDetails],
  );

  return (
    <>
      <View style={[styles.flex, CssStyles.topTabcontainer]}>
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
          <Text style={styles.addText}>Product Booking</Text>
        </View>
        <TouchableOpacity style={styles.imageBackGround}>
          <MaterialCommunityIcons
            size={moderateScale(25)}
            //style={styles.addIconColor}
            style={styles.iconStyles}
            name="bell-outline"
          />
        </TouchableOpacity>
      </View>
      {orderDetails.length
        ? orderDetails.map((item, index) => (
          item.productDetails.length ?
            <View key={index} style={styles.container}>
              <View style={styles.topContent}>
                <View style={styles.flex}>
                  <View>
                    <Group />
                  </View>
                  <View key={index} style={styles.middleContainer}>
                    <Text style={styles.nameText}>
                      {item.buyer_details.name}
                    </Text>
                    {item.productDetails.map((product, key) => (
                      <View key={key}>
                        <View style={styles.middleFlex}>
                          <Text style={styles.passageText}>
                            {product.product_quantity} - {product.product_name}
                          </Text>
                          <Text style={styles.passageText}>
                            {product.product_discount_price} INR
                          </Text>
                        </View>
                        <Text>
                          ---------------------------------------------------
                        </Text>
                        <View style={styles.middleFlex}>
                          <Text style={styles.passageText}>Total</Text>
                          <Text style={styles.passageText}>
                            {product.product_total_price} INR
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
                <View style={styles.messageContainer}>
                  <TouchableOpacity style={styles.messageICon}>
                    <MaterialCommunityIcons
                      color="#002058"
                      size={moderateScale(20)}
                      name="message"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <LineSvg />
                {item?.productDetails[0]?.product_order_status === 'Pickup Requested' && (
                  <View style={styles.endFlex}>
                    <Text style={styles.passageText}>
                      Accept order pick-up request?
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        onYesPress(
                          item.order_id,
                          item.productDetails[0].product_id,
                          item.productDetails[0].document_id,
                          item?.productDetails[0]?.product_order_status,
                        )
                      }
                      style={[styles.buttons, styles.yesButton]}>
                      <Text style={styles.buttonText}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttons, styles.noButton]}>
                      <Text style={styles.buttonText}>No</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {item?.productDetails[0]?.product_order_status === 'Pickup Accepted' && (
                  <View style={styles.endFlex}>
                    <Text style={styles.passageText}>Order Picked Up?</Text>
                    <TouchableOpacity
                      onPress={() =>
                        onYesPress(
                          item.order_id,
                          item.productDetails[0].product_id,
                          item.productDetails[0].document_id,
                          item?.productDetails[0]?.product_order_status,
                        )
                      }
                      style={[styles.buttons, styles.yesButton]}>
                      <Text style={styles.buttonText}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttons, styles.noButton]}>
                      <Text style={styles.buttonText}>No</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {item?.productDetails[0]?.product_order_status === 'Pickup Completed' &&
                  <View style={[styles.flexAlign, styles.padding]}>
                    <View style={styles.flexDisplay}>
                      <Group />
                      <Text style={styles.passage1}>Confidence Rating</Text>
                      <MaterialCommunityIcons
                        color="#42629A"
                        size={moderateScale(20)}
                        name="information"
                      />
                    </View>
                    <View style={styles.flexDisplay}>
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
                }
              </View>
            </View> : null
          ))
        : null}
    </>
  );
}

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
  },
  passage1: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: moderateScale(14),
    color: '#002058',
  },
  flexDisplay: {
    flexDirection: 'row',
  },
  addIconColor: {
    color: '#002058',
  },
  nameText: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: moderateScale(16),
    color: '#002058',
  },
  imageBackGround: {
    backgroundColor: '#EAEFF8',
    height: moderateScale(40),
    width: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(20),
  },
  iconStyles: {
    color: '#002058',
  },
  addText: {
    color: '#42629A',
    fontSize: moderateScale(13),
  },
  container: {
    height: moderateScale(148),
    width: moderateScale(345),
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(10),
    alignSelf: 'center',
    margin:moderateScale(10),
  },
  topContent: {
    height: moderateScale(100),
    flexDirection: 'row',
    width: '100%',
  },
  messageICon: {
    backgroundColor: '#EAEFF8',
    height: moderateScale(32),
    width: moderateScale(32),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(15),
  },
  messageContainer: {
    position: 'absolute',
    right: moderateScale(10),
    top: moderateScale(10),
  },
  middleContainer: {
    maxWidth: moderateScale(217),
    maxHeight: moderateScale(89),
    paddingLeft: moderateScale(20),
  },
  middleFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  endFlex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
    marginVertical: moderateScale(5),
    marginHorizontal: moderateScale(10),
  },
  noButton: {
    backgroundColor: '#CF0000',
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
  },
  flexAlign: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  padding: {
    padding: moderateScale(10),
  },
});

export default Bookings;
