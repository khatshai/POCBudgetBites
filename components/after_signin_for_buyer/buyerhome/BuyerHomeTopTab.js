import React, { useContext } from 'react';
import {View,Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { moderateScale } from '../../../responsiveness/Metrics';
import LocationSVG from '../../../images/sellericons/LocationSVG';
import CssStyles from '../../Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BuyerContext from '../../contextfolder/BuyerContextProvider';

export function BuyerHomeTopTab({scrollY}) {
  const {buerUserDetails} = useContext(BuyerContext);
  console.log(buerUserDetails,'buyerUserDetails');
  return (
    <>
      <View style={CssStyles.topTabcontainer}>
      <View style={styles.flex}>
      <View style={styles.iconsContainer}>
      <Image
          style={styles.imageStyles}
          resizeMethod="auto"
          source={
           require('../../../images/Group-995.png')
          }
        />
      </View>
      <View style={[CssStyles.topTabCenterContainer, styles.padding]}>
      <LocationSVG/>
      <Text style={styles.headerText}>Indra Nagar, Gachibowli</Text>
      </View>
      <TouchableOpacity style={[styles.iconsContainer, styles.imageBackGround]}>
        <MaterialCommunityIcons color="#002058" size={moderateScale(24)} name="bell-outline"/>
      </TouchableOpacity>
      </View>
      {/* {!scrollY &&
      <View>
      <Text>Hello</Text>
      </View>} */}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  padding:{
    padding: moderateScale(15),
  },
  iconsContainer:{
    justifyContent:'center',
    margin:moderateScale(10),
  },
  flex:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyles:{
    height:moderateScale(50),
    width:moderateScale(50),
  },
  imageBackGround: {
    backgroundColor: '#F9F2EE',
    height: moderateScale(40),
    width: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(20),
  },
    headerText:{
      fontFamily:'Ubuntu-Regular',
      fontSize:moderateScale(12),
      color:'#42629A',
  },
});

