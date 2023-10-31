import React, {useState, useContext} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView, Text} from 'react-native';
import {
  FoodCart,
  FoodTruck,
  HouseHold,
  NGOSvg,
  OtherRetailersSvg,
  Resturant,
  SocietySVG,
} from '../../images/BussinessTypeSelectionSVGs';
import {BackArrow} from '../../images/Arrow';
import {NextButton} from '../Buttons';
import {moderateScale} from '../../responsiveness/Metrics';
import Context from '../contextfolder/ContextProvider';

function BuyerTypeSelection({navigation}) {
  const { setTypeOfBussiness } = useContext(Context);
  const [isDisabled, setIsDisabiled] = useState(true);

  const [sellerType, setSellerType] = useState('');

  const onNextButtonPress = () => {
    setTypeOfBussiness(sellerType);
    navigation.navigate('Buyer_On_Boarding');
  };

  const onBackClick = () => {
    navigation.goBack();
  };

  const onNGOClick = () => {
    setSellerType('NGO');

    setIsDisabiled(false);
  };
  const onSocietyClick = () => {
    setSellerType('Society');

    setIsDisabiled(false);
  };
  const onFoodTruckClick = () => {
    setSellerType('Food Truck');

    setIsDisabiled(false);
  };
  const onFoodCartClick = () => {
    setSellerType('Food Cart');

    setIsDisabiled(false);
  };

  const onHouseHoldClick = () => {
    setSellerType('Household');

    setIsDisabiled(false);
  };
  const onResturantClick = () => {
    setSellerType('Restaurant');

    setIsDisabiled(false);
  };
  const onOtherRetailersClick = () => {
    setSellerType('OtherRetailers');

    setIsDisabiled(false);
  };

  return (
    <>
      <View style={styles.bgcolor}>
        <BackArrow onBackClick={onBackClick} />
      </View>
      <ScrollView style={styles.container}>
      <Text style={styles.headingText}>What Kind of a buyer are you?</Text>
        <View style={styles.direction}>
          <View>
          <TouchableOpacity onPress={onHouseHoldClick}>
          <HouseHold
              circleColor={sellerType === 'Household' ? '#EAEFF8' : '#fff'}
              borderColor={sellerType === 'Household' ? '#002058' : 'none'}
              borderWidth={sellerType === 'Household' ? moderateScale(2) : 0}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Household</Text>
          </View>
          <View>
          <TouchableOpacity onPress={onNGOClick}>
            <NGOSvg
              circleColor={sellerType === 'NGO' ? '#EAEFF8' : '#fff'}
              borderColor={sellerType === 'NGO' ? '#002058' : 'none'}
              borderWidth={sellerType === 'NGO' ? moderateScale(2) : 0}
            />
          </TouchableOpacity>
          <Text style={styles.text}>NGO Volunteer</Text>
          </View>
        </View>
        <View style={styles.direction}>
          <View>
          <TouchableOpacity onPress={onResturantClick}>
            <Resturant
              circleColor={sellerType === 'Restaurant' ? '#EAEFF8' : '#fff'}
              borderColor={sellerType === 'Restaurant' ? '#002058' : 'none'}
              borderWidth={sellerType === 'Restaurant' ? moderateScale(2) : 0}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Restaurant</Text>
          </View>
          <View>
          <TouchableOpacity onPress={onFoodTruckClick}>
            <FoodTruck
              circleColor={sellerType === 'Food Truck' ? '#EAEFF8' : '#fff'}
              borderColor={sellerType === 'Food Truck' ? '#002058' : 'none'}
              borderWidth={sellerType === 'Food Truck' ? moderateScale(2) : 0}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Food Truck</Text>
          </View>
        </View>
        <View style={styles.direction}>
          <View>
          <TouchableOpacity onPress={onSocietyClick}>
            <SocietySVG
              circleColor={sellerType === 'Society' ? '#EAEFF8' : '#fff'}
              borderColor={sellerType === 'Society' ? '#002058' : 'none'}
              borderWidth={sellerType === 'Society' ? moderateScale(2) : 0}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Society</Text>
          </View>
          <View>
          <TouchableOpacity onPress={onFoodCartClick}>
            <FoodCart
              circleColor={sellerType === 'Food Cart' ? '#EAEFF8' : '#fff'}
              borderColor={sellerType === 'Food Cart' ? '#002058' : 'none'}
              borderWidth={sellerType === 'Food Cart' ? moderateScale(2) : 0}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Food Cart</Text>
          </View>
        </View>
        <View style={[styles.direction, styles.bottomPadding]}>
          <View>
          <TouchableOpacity onPress={onOtherRetailersClick}>
            <OtherRetailersSvg
              circleColor={sellerType === 'OtherRetailers' ? '#EAEFF8' : '#fff'}
              borderColor={sellerType === 'OtherRetailers' ? '#002058' : 'none'}
              borderWidth={sellerType === 'OtherRetailers' ? moderateScale(2) : 0}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Other Retailers</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <NextButton
          disablility={isDisabled}
          onNextButtonPress={onNextButtonPress}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
    paddingHorizontal: moderateScale(30),
  },
  bottomPadding:{
    paddingBottom:moderateScale(50),
  },
  bgcolor: {
    backgroundColor: '#F8F9FC',
  },
  direction: {
    flexDirection: 'row',
    margin: moderateScale(20),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    paddingVertical: moderateScale(30),
    paddingRight: moderateScale(20),
    backgroundColor: '#F8F9FC',
    alignItems: 'center',
    justifyContent:'center',
  },
  text:{
    color:'#002058',
    fontSize:moderateScale(14),
    textAlign:'center',
    fontFamily:'Ubuntu-Medium',
  },
  headingText:{
    color:'#002058',
    fontSize:moderateScale(20),
    textAlign:'center',
    fontFamily:'Ubuntu-Medium',
  },
});

export default BuyerTypeSelection;
