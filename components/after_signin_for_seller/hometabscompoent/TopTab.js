import React, { useContext } from 'react';
import {View,Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  moderateScale,
} from '../../../responsiveness/Metrics';
import NotificationSVG from '../../../images/sellericons/NotificationSVG';
import LocationSVG from '../../../images/sellericons/LocationSVG';
import CssStyles from '../../Styles';
import TypeSelection from '../homecomponent/TypeSelection';
import Context from '../../contextfolder/ContextProvider';

export function HomeTopTab({scrollY}) {
  const {userDetails} = useContext(Context);
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
      <Text style={styles.locationText}>{userDetails?.storeName}, {userDetails?.address2}</Text>
      </View>
      <TouchableOpacity style={styles.iconsContainer}>
      <NotificationSVG />
      </TouchableOpacity>
      </View>
      {!scrollY &&
      <View>
      <TypeSelection />
      </View>}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  locationText: {
    color: '#002058',
    fontSize: moderateScale(12),
    fontFamily:'Ubuntu-Regular',
  },
  padding:{
    padding: moderateScale(15),
  },
  iconsContainer:{
    justifyContent:'center',
    margin:moderateScale(10),
  },
  flex:{
    flexDirection:'row',
  },
  imageStyles:{
    height:moderateScale(50),
    width:moderateScale(50),
  },
});
