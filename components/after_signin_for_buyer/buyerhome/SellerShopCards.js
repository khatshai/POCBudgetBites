import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { moderateScale } from '../../../responsiveness/Metrics';
import { Group, LineSvg } from '../../../images/sellericons/BookingSVGs';
//import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

function SellerShopCards({item}) {
    const navigation = useNavigation();
    const [isFaviouriteAdded, setIsFaviouriteAdded] = useState(false);
    const [discountCount, setDiscountCount] = useState(0);
    //const [searchKey, setSearchKey] = useState('');
    // const navigation = useNavigation();
    // const onBackPressHandler = () => {
    //     navigation.goBack();
    // };

    useEffect(()=>{
      const discountedProductsCount = (item.publishedProducts).reduce((count,product)=>{
        if (product.product_discount_price){
          return count + 1;
        }
        return count;
      },0);
      setDiscountCount(discountedProductsCount);
    },[item.publishedProducts]);

    const onBackPressHandler = () => {
        console.log('BAck Pressed');
    };

    const onHeartPress = () => {
       setIsFaviouriteAdded(!isFaviouriteAdded);
    };

    const onShopSelectedHandler = () => {
        navigation.navigate('Shop_Items_Page',{item:item, discountCount:discountCount});
    };

  return (
    <>
       <View style={styles.container}>
        <View style={styles.topContent}>
        <TouchableOpacity style={styles.flex} onPress={onShopSelectedHandler}>
        <View>
        <Group/>
      </View>
      <View style={styles.middleContainer}>
      <Text style={styles.nameText}>{item.sellerDetails.storeName}</Text>
        <View style={styles.middleFlex}>
        <Text style={styles.passageText}>1.2 km | {item.sellerDetails.address1}</Text>
        </View>
        <View style={styles.middleFlex}>
        <Text style={styles.passageText}>Products on Discount: {discountCount}</Text>
        </View>
      </View>
        </TouchableOpacity>
      <View style={styles.heartContainer}>
      <TouchableOpacity onPress={onHeartPress} style={styles.heartIcon}>
      <MaterialCommunityIcons color={isFaviouriteAdded ? '#FF5700' : '#869FCB' } size={moderateScale(22)} name={isFaviouriteAdded  ? 'heart' : 'cards-heart-outline'}/>
      </TouchableOpacity>
      </View>
        </View>
        <View>
        <LineSvg/>
        <View style={styles.endFlex}>
          <Text style={styles.discountsText}>Discounts available ranging from 20% to 60%</Text>
        </View>
        </View>
      </View>
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
    nameText:{
      fontFamily:'Ubuntu-Bold',
      fontSize:moderateScale(18),
      color:'#002058',
    },
    container:{
        height: moderateScale(120),
        width: moderateScale(345),
        backgroundColor:'#FFFFFF',
        borderRadius:moderateScale(10),
        alignSelf:'center',
        margin:moderateScale(10),
    },
    topContent:{
        height:moderateScale(90),
        flexDirection:'row',
        width:'100%',
    },
       heartIcon: {
        height: moderateScale(32),
        width: moderateScale(32),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(15),
    },
    heartContainer:{
      position: 'absolute',
      right:moderateScale(10),
      top:moderateScale(10),
    },
    middleContainer:{
      maxWidth:moderateScale(217),
      maxHeight:moderateScale(89),
      paddingLeft:moderateScale(20),
    },
    middleFlex:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
    },
    endFlex:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'row',
    },
    buttons:{
      height:moderateScale(24),
      width:moderateScale(42),
      borderRadius:moderateScale(20),
      justifyContent:'center',
      alignItems:'center',
    },
    passageText:{
      fontFamily:'Ubuntu-Regular',
      fontSize:moderateScale(14),
      color:'#002058',
    },
    discountsText:{
      fontFamily:'Ubuntu-Regular',
      fontSize:moderateScale(12),
      color:'#42629A',
      marginTop:moderateScale(5),
    },
    inputField: {
        borderColor: '#B5C7E6',
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(20),
        margin: moderateScale(10),
        width: moderateScale(330),
        height: moderateScale(40),
      },
      input:{
        fontSize: moderateScale(14),
        marginLeft:moderateScale(2),
        fontFamily:'Ubuntu-Regular',
      },
      passwordContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
      },
  });

export default SellerShopCards;

