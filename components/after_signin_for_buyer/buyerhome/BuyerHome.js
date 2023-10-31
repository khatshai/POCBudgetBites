import React, {useCallback, useContext, useEffect, useState} from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import BuyerHomeSVG from '../../../images/buyerIcons/BuyerHomeSVG';
import { BuyerHomeTopTab } from './BuyerHomeTopTab';
import SellersSelection from './SellersSelection';
import { moderateScale } from '../../../responsiveness/Metrics';
import SellerShopCards from './SellerShopCards';
import CssStyles from '../../Styles';
import CartSVG from '../../../images/buyerIcons/CartSVG';
import { useNavigation } from '@react-navigation/native';
import { getSellerStores } from '../../../services/BuyerProductServices';
import BuyerContext from '../../contextfolder/BuyerContextProvider';

function BuyerHome() {
  const navigation = useNavigation();
  const {buyerAuthToken, setUpdateBuyerApi} = useContext(BuyerContext);
  const [nearBysellersData, setNeatBySellersData] = useState([]);

  const onCartPressed = () => {
    navigation.navigate('Buyer_Cart_Items');
  };

  const getNearBySellersShopsList = useCallback(async () => {
    const response = await getSellerStores({buyerAuthToken});
    if (response.succes){
      //console.log(response.groupBySeller,'response.groupBySeller');
      setNeatBySellersData(response.groupBySeller);
    }
  },[buyerAuthToken]);

  useEffect(() => {
    getNearBySellersShopsList();
    setUpdateBuyerApi({reloadData: getNearBySellersShopsList});
  }, [getNearBySellersShopsList, setUpdateBuyerApi]);

  return (
    <View style={styles.containerbg}>
      <ScrollView contentContainerStyle={CssStyles.scrollContainer}>
      <View>
    <BuyerHomeTopTab/>
    <BuyerHomeSVG/>
    <View style={styles.container}>
    <SellersSelection/>
    </View>
    <View>
      {
        nearBysellersData.map((item,index)=>{
          return (
            <View key={index}>
          <SellerShopCards item={item}/>
          </View>
          );
        })
      }
    </View>
    {/* <View>
     <SellerShopCards />
    </View> */}
    </View>
    </ScrollView>
    <View>
    <Text>2</Text>
    <TouchableOpacity onPress={onCartPressed} style={styles.cartContainer}>
      <CartSVG/>
    </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerbg: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },
  container:{
    padding:moderateScale(10),
  },
  cartContainer:{
    position:'absolute',
    bottom:moderateScale(20),
    right:moderateScale(20),
  },
});

export default BuyerHome;
