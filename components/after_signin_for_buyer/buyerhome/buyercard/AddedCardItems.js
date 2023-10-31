import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { moderateScale } from '../../../../responsiveness/Metrics';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LineSvg } from '../../../../images/sellericons/BookingSVGs';

const moderate = moderateScale(13);
function AddedCardItems({productDetails}) {
  const [quantity, setQuantity] = useState(0);
  let totalAmount = 0;

  const onPlusClick = () => {
    setQuantity(quantity + 1);
  };

  const onMinusClick = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <View style={styles.itemsContanier}>
      {
        productDetails.length ? productDetails.map((product, index)=>{
          totalAmount += (product.product_discount_price * product.product_quantity);
          return (<View key={index} style={styles.bottomCardflex}>
        <View>
          <Text style={styles.passage2}>{product.product_name}</Text>
          <View style={styles.priceTextAlign}>
            <View style={styles.strikeThoughStyles} />
            <Text style={[styles.textMargin, styles.passage4]}>{product.product_mrp} INR</Text>
            <Text style={styles.passage3}>{product.product_discount_price} INR</Text>
          </View>
        </View>
        <View style={[styles.fieldSelector]}>
          <TouchableOpacity
            onPress={onMinusClick}
            style={[styles.iconBG, styles.iconBGColor]}>
            <AntDesign
              name="minus"
              size={moderateScale(15)}
              style={styles.icon}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.passage2}>{product.product_quantity}</Text>
          </View>
          <TouchableOpacity
            onPress={onPlusClick}
            style={[styles.iconBG, styles.iconBGColor]}>
            <AntDesign
              name="plus"
              size={moderateScale(15)}
              style={styles.icon}
              color="#002058"
            />
          </TouchableOpacity>
        </View>
      </View>
      );}) : null
      }
      <View style={styles.bottomCardItems}>
        <LineSvg />
        <View style={styles.bottomCardflex}>
          <Text style={styles.passage2}>Total:</Text>
          <Text style={styles.passage2}>{totalAmount} INR</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
    justifyContent: 'space-between',
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
    width: moderateScale(116),
  },
  locationText: {
    color: '#002058',
    fontSize: moderateScale(14),
    fontFamily: 'Ubuntu-Regular',
  },
  padding: {
    padding: moderateScale(20),
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyles: {
    height: moderateScale(50),
    width: moderateScale(50),
  },
  imageBackGround: {
    backgroundColor: '#F9F2EE',
    height: moderateScale(40),
    width: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(20),
  },
  bottomTabcontainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: moderateScale(20),
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
  buttonContainer: {
    backgroundColor: '#FF5700',
    height: moderateScale(34),
    width: moderateScale(345),
    justifyContent: 'center',
    alignItems: 'center',
    margin: moderateScale(20),
    borderRadius: moderateScale(20),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    fontFamily: 'Ubuntu-Medium',
  },
  itemsContanier: {
    backgroundColor: '#FFFFFF',
    minheight: moderateScale(180),
    width: moderateScale(345),
    borderRadius: moderateScale(15),
    justifyContent: 'space-between',
  },
  flexAlign: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomCardflex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: moderateScale(10),
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
  priceTextAlign: {
    flexDirection: 'row',
  },
  strikeThoughStyles: {
    position: 'absolute',
    transform: [{rotate: `${moderate}deg`}],
    top: moderateScale(7),
    width: moderateScale(40),
    height: moderateScale(2),
    borderBottomWidth: moderateScale(2),
  },
  textMargin: {
    marginRight: moderateScale(10),
  },
  passage2:{
    fontSize:moderateScale(14),
    fontFamily:'Ubuntu-Medium',
    color:'#002058',
  },
  passage3:{
    fontSize:moderateScale(12),
    fontFamily:'Ubuntu-Medium',
    color:'#002058',
  },
  passage4:{
    fontSize:moderateScale(12),
    fontFamily:'Ubuntu-Regular',
    color:'#42629A',
  },
});

export default AddedCardItems;
