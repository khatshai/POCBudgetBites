import React, {useState, useContext} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView, Text} from 'react-native';
import {
  Bakery,
  FoodCart,
  FoodTruck,
  GreenGrocery,
  GroceryStore,
  HouseHold,
  SweetShall,
  WholeSellers,
} from '../../images/BussinessTypeSelectionSVGs';
import {BackArrow} from '../../images/Arrow';
import {NextButton} from '../Buttons';
import {moderateScale} from '../../responsiveness/Metrics';
import Context from '../contextfolder/ContextProvider';
import {useTranslation} from 'react-i18next'

function SellerTypeSelection({navigation}) {
  const {setTypeOfBussiness} = useContext(Context);
  const [isDisabled, setIsDisabiled] = useState(true);

  const [sellerType, setSellerType] = useState('');
const {t} = useTranslation();
  const onNextButtonPress = () => {
    setTypeOfBussiness(sellerType);
    navigation.navigate('Seller_On_Boarding');
  };

  const onBackClick = () => {
    navigation.goBack();
  };

  const onGroceryClick = () => {
    setSellerType('Grocery Store');

    setIsDisabiled(false);
  };
  const onBakeryClick = () => {
    setSellerType('Bakery');

    setIsDisabiled(false);
  };
  const onGreenGroceryClick = () => {
    setSellerType('Green Grocery');

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
  const onSweetShallClick = () => {
    setSellerType('Sweet Stall');

    setIsDisabiled(false);
  };
  const onWholeSellerClick = () => {
    setSellerType('Wholesellers');

    setIsDisabiled(false);
  };

  return (
    <>
      <View style={styles.bgcolor}>
        <BackArrow onBackClick={onBackClick} />
      </View>
      <ScrollView style={styles.container}>
      <Text style={styles.headingText}>{t('translations.seller_type_selection')}</Text>
        <View style={styles.direction}>
          <View>
          <TouchableOpacity onPress={onGroceryClick}>
          {/* <Image source={{uri:'../images/WholeSellers.svg'}}/> */}
            <GroceryStore
              circleColor={sellerType === 'Grocery Store' ? '#EAEFF8' : '#fff'}
              borderColor={sellerType === 'Grocery Store' ? '#002058' : 'none'}
              borderWidth={sellerType === 'Grocery Store' ? moderateScale(2) : 0}
            />
          </TouchableOpacity>
          <Text style={styles.text}>{t('translations.seller_types.grocery_store')}</Text>
          </View>
          <View>
          <TouchableOpacity onPress={onBakeryClick}>
            <Bakery
              circleColor={sellerType === 'Bakery' ? '#EAEFF8' : '#fff'}
              borderColor={sellerType === 'Bakery' ? '#002058' : 'none'}
              borderWidth={sellerType === 'Bakery' ? moderateScale(2) : 0}
            />
          </TouchableOpacity>
          <Text style={styles.text}>{t('translations.seller_types.bakery')}</Text>
          </View>
        </View>
        <View style={styles.direction}>
          <View>
          <TouchableOpacity onPress={onSweetShallClick}>
            <SweetShall
              circleColor={sellerType === 'Sweet Stall' ? '#EAEFF8' : '#fff'}
              borderColor={sellerType === 'Sweet Stall' ? '#002058' : 'none'}
              borderWidth={sellerType === 'Sweet Stall' ? moderateScale(2) : 0}
            />
          </TouchableOpacity>
          <Text style={styles.text}>{t('translations.seller_types.sweets_stall')}</Text>
          </View>
          <View>
          <TouchableOpacity onPress={onFoodTruckClick}>
            <FoodTruck
              circleColor={sellerType === 'Food Truck' ? '#EAEFF8' : '#fff'}
              borderColor={sellerType === 'Food Truck' ? '#002058' : 'none'}
              borderWidth={sellerType === 'Food Truck' ? moderateScale(2) : 0}
            />
          </TouchableOpacity>
          <Text style={styles.text}>{t('translations.seller_types.food_truck')}</Text>
          </View>
        </View>
        <View style={styles.direction}>
          <View>
          <TouchableOpacity onPress={onGreenGroceryClick}>
            <GreenGrocery
              circleColor={sellerType === 'Green Grocery' ? '#EAEFF8' : '#fff'}
              borderColor={sellerType === 'Green Grocery' ? '#002058' : 'none'}
              borderWidth={sellerType === 'Green Grocery' ? moderateScale(2) : 0}
            />
          </TouchableOpacity>
          <Text style={styles.text}>{t('translations.seller_types.green_grocery')}</Text>
          </View>
          <View>
          <TouchableOpacity onPress={onFoodCartClick}>
            <FoodCart
              circleColor={sellerType === 'Food Cart' ? '#EAEFF8' : '#fff'}
              borderColor={sellerType === 'Food Cart' ? '#002058' : 'none'}
              borderWidth={sellerType === 'Food Cart' ? moderateScale(2) : 0}
            />
          </TouchableOpacity>
          <Text style={styles.text}>{t('translations.seller_types.food_cart')}</Text>
          </View>
        </View>
        <View style={[styles.direction, styles.bottomPadding]}>
          <View>
          <TouchableOpacity onPress={onHouseHoldClick}>
            <HouseHold
              circleColor={sellerType === 'Household' ? '#EAEFF8' : '#fff'}
              borderColor={sellerType === 'Household' ? '#002058' : 'none'}
              borderWidth={sellerType === 'Household' ? moderateScale(2) : 0}
            />
          </TouchableOpacity>
          <Text style={styles.text}>{t('translations.seller_types.household')}</Text>
          </View>
          <View>
          <TouchableOpacity onPress={onWholeSellerClick}>
            <WholeSellers
              circleColor={sellerType === 'Wholesellers' ? '#EAEFF8' : '#fff'}
              borderColor={sellerType === 'Wholesellers' ? '#002058' : 'none'}
              borderWidth={sellerType === 'Wholesellers' ? moderateScale(2) : 0}
            />
          </TouchableOpacity>
          <Text style={styles.text}>{t('translations.seller_types.whole_seller')}</Text>
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

export default SellerTypeSelection;
