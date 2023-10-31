import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {
  moderateScale,
} from '../responsiveness/Metrics';
import Icon from 'react-native-vector-icons/Ionicons';

export const BackArrow = ({onBackClick}) => {
  return (
    <TouchableOpacity onPress={onBackClick} style={styles.backArrowContainer}>
      <View style={styles.backarrowBackGround}>
        <View >
          <Icon
            name="chevron-back-sharp"
            size={moderateScale(20)}
            style={styles.backArrow}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const ForwardArrow = function () {
  return (
    <View style={styles.forwardArrowContainer}>
      <View style={styles.forwardarrowBackGround}>
        <Icon
          name="chevron-forward-sharp"
          size={moderateScale(20)}
          style={styles.forwardArrow}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  forwardArrowContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrowContainer: {
    marginTop: moderateScale(20),
    marginLeft: moderateScale(20),
  },
  backarrowBackGround: {
    backgroundColor: '#EAEFF8',
    height: moderateScale(40),
    width: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(20),
  },
  forwardarrowBackGround: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  forwardArrow: {
    color: 'rgba(0, 32, 88, 1)',
    height: moderateScale(30),
    width: moderateScale(30),
    textAlign: 'center',
  },
  backArrow: {
    color: 'rgba(0, 32, 88, 1)',
  },
});
