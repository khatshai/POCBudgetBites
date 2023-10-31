import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import { moderateScale } from './responsiveness/Metrics';
import SplashScreenComp from './components/SplashScreenComp';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigations/Navigation';


const App = () => {
  const [splashScreen, setSplashScreen] = useState(true);

  const splashScreenCall = value => {
    setSplashScreen(value);
  };

  return (
    <View style={styles.mainContainer}>
      {splashScreen ? (
        <SplashScreenComp splashScreenCall={splashScreenCall} />
      ) : (
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      )}
        {/* <NavigationContainer>
        <BuyerComp/>
        </NavigationContainer> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:'#F8F9FC',
  },
  container: {
    width: '100%',
    height: '100%',
  },
  imageStyles:{
    height:moderateScale(82),
    width:moderateScale(82),
  },
});

export default App;
