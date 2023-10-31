import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  moderateScale,
} from '../../responsiveness/Metrics';

function CancelOkButtons({cancleClick, okClick, okText, cancelText}) {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        onPress={cancleClick}
        style={[styles.buttons, styles.cancelButton]}>
        <View style={styles.buttonsTextContainer}>
          <Text style={styles.buttonsCancelText}>
            {cancelText ? cancelText : 'Cancel'}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={okClick}
        style={[styles.buttons, styles.okButton]}>
        <View style={styles.buttonsTextContainer}>
          <Text style={styles.buttonsOkText}>{okText ? okText : 'Ok'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: moderateScale(10),
  },
  buttons: {
    borderRadius: moderateScale(20),
    height: moderateScale(34),
    width: moderateScale(130),
  },
  cancelButton: {
    borderColor: '#009E83',
    backgroundColor: '#FFFFFF',
    borderWidth: moderateScale(2),
    margin:moderateScale(5),
  },
  okButton: {
    backgroundColor: '#009E83',
    borderWidth: moderateScale(0),
    margin:moderateScale(5),
  },
  buttonsTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsCancelText: {
    color: '#009E83',
    fontSize: moderateScale(14),
    fontFamily:'Ubuntu-Medium',
  },
  buttonsOkText: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    fontFamily:'Ubuntu-Medium',
  },
});

export default CancelOkButtons;
