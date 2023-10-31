import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  moderateScale,
} from '../../../responsiveness/Metrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CssStyles from '../../Styles';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Context from '../../contextfolder/ContextProvider';

function BasicAddTopTab({color}){
  const navigation = useNavigation();

  const {
    setProductType,
    setProductWeight,
    setProductName,
    setProductMrp,
    setProductDiscount,
    setProductDiscountedPrice,
    setProductUnitSelection,
    setProductSellQuantity,
    setProductGiftQuantity,
    setProductExpirydate,
  } = useContext(Context);

  const onBackPressHandler = () => {
    setProductType('Packed Food');
    setProductWeight('');
    setProductName('');
    setProductMrp(null);
    setProductDiscount(null);
    setProductDiscountedPrice(null);
    setProductUnitSelection('');
    setProductSellQuantity(null);
    setProductGiftQuantity(null);
    setProductExpirydate('');
    navigation.navigate('Tab');
  };

  return (
    <View style={[styles.flex, styles.paddingBasic]}>
        { <TouchableOpacity
          onPress={onBackPressHandler}
          style={styles.imageBackGround}>
          <Ionicons
            name="chevron-back-sharp"
            size={moderateScale(20)}
            style={styles.iconStyles}
          />
        </TouchableOpacity>}
        <View style={CssStyles.topTabCenterContainer}>
          <Text style={styles.addText}>Add Product</Text>
        </View>
        <TouchableOpacity style={styles.imageBackGround}>
          <MaterialCommunityIcons
            size={moderateScale(25)}
            color={color}
            name="bell-outline"
          />
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  paddingBasic: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addIconColor: {
    color: '#009E83',
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
    color: 'rgba(0, 32, 88, 1)',
  },
  addText: {
    color: '#42629A',
    fontSize: moderateScale(13),
  },
});

export default BasicAddTopTab;

