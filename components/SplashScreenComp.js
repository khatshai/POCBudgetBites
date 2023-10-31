import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import BudgetBitesSVG from '../images/BudgetBitesSVG';
import { moderateScale } from '../responsiveness/Metrics';

const SplashScreenComp = ({splashScreenCall}) => {
  const [screen1, setScreen1] = useState(true);
 const [screen2, setScreen2] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen1(false);
      setScreen2(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (screen2) {
      const timer2 = setTimeout(() => {
        setScreen2(false);
        splashScreenCall(false);
      }, 2000);

      return () => clearTimeout(timer2);
    }
  }, [screen2, splashScreenCall]);

  return (
    <View style={styles.container}>
      {screen1 &&
      <View style={styles.centerAlignment}>
      <BudgetBitesSVG />
      <Text style={styles.text}>A solution towards reducing food wastage</Text>
      </View>
      }
      {screen2 &&
      <View style={styles.centerAlignment}>
      {/* <BBSVG/> */}
      <Image
          style={styles.imageStyles}
          resizeMethod="auto"
          source={require('../images/Group-995.png')}
        />
        <Text style={styles.text}>A solution towards reducing food wastage</Text>
      </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FC',
  },
  text:{
    color:'#002058',
    fontSize:moderateScale(14),
    margin:moderateScale(6),
    textAlign:'center',
    fontFamily:'Ubuntu-Medium',
  },
  centerAlignment:{
    alignItems:'center',
    justifyContent:'center',
  },
  imageStyles:{
    height:moderateScale(82),
    width:moderateScale(82),
  },
});

export default SplashScreenComp;
