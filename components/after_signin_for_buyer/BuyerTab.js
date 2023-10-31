import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import { moderateScale } from '../../responsiveness/Metrics';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BuyerHome from './buyerhome/BuyerHome';
import BuyerProfile from './BuyerProfile';
import HomeSVG from '../../images/sellericons/HomeSVG';
import { MyOrdersSvg } from '../../images/sellericons/SaleReportIconSVG';
import ProfileSVG from '../../images/sellericons/ProfileSVG';
import BuyerContext from '../contextfolder/BuyerContextProvider';
import BuyerOrders from './buyerorder/BuyerOrders';

const Tabs = createBottomTabNavigator();

const BuyerTab = () => {
  const renderTabIcon = (route, color) => {
    if (route.name === 'Home') {
      return <HomeSVG iconColor={color} />;
    }
    if (route.name === 'My Orders') {
      return <MyOrdersSvg iconColor={color} />;
    }
    if (route.name === 'Profile') {
      return <ProfileSVG iconColor={color} />;
    }
  };

  return (
      <View
        style={styles.container}>
        <Tabs.Navigator
          screenOptions={({route}) => ({
           tabBarIcon: ({color}) => renderTabIcon(route, color),
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#FFFFFF',
              height: moderateScale(72),
              borderTopLeftRadius: moderateScale(30),
              borderTopRightRadius: moderateScale(30),
              ...styles.tabShadow,
            },
            tabBarActiveTintColor: '#FF5700',
            tabBarInactiveTintColor: '#ECB091',
            tabBarLabelStyle: {
              fontSize: moderateScale(12),
              marginBottom: moderateScale(15),
              fontFamily: 'Ubuntu-Medium',
            },
          })}>
          <Tabs.Screen name="Home" component={BuyerHome} />
          <Tabs.Screen name="My Orders" component={BuyerOrders} />
          <Tabs.Screen name="Profile" component={BuyerProfile} />
        </Tabs.Navigator>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F8F9FC',
  },
  tabShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    borderTopWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  addIconContainer: {
    position: 'absolute',
    top: -35,
  },
});

export default BuyerTab;
