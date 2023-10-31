import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../responsiveness/Metrics';
import Icon from 'react-native-vector-icons/AntDesign';
import CancelOkButtons from './CancelOkButtons';


const Gift = ({navigation}) => {
  const [quality, setQuality] = useState(3);

  const totalQuality = 12;

  const onPlusClick = () => {
    setQuality(quality + 1);
  };

  const onMinusClick = () => {
    if (quality > 1){
      setQuality(quality - 1);
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Gift Product?</Text>
    <Text style={styles.text}>Total Available Quantity: {totalQuality}</Text>
    <Text style={styles.text}>Gift Quantity:</Text>
      <View style={styles.qualitySelectorCont}>
      <View style={styles.qualitySelector}>
        <TouchableOpacity onPress={onMinusClick} style={[styles.iconBG]}>
          <Icon name="minus" size={moderateScale(15)} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.textContainer}><Text style={styles.text1}>{quality}</Text></View>
        <TouchableOpacity onPress={onPlusClick} style={[styles.iconBG]}>
          <Icon name="plus" size={moderateScale(15)} style={styles.icon} />
        </TouchableOpacity>
      </View>
      </View>
      <CancelOkButtons okText={'Gift'}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'yellow',
    borderRadius:moderateScale(15),
    margin:moderateScale(30),
    maxWidth:moderateScale(400),
    padding:moderateScale(5),
  },
  qualitySelectorCont:{
    display:'flex',
    alignItems:'center',
  },
  title: {
    color: 'rgba(0, 32, 88, 1)',
    fontSize: moderateScale(20),
    :'bold',
    textAlign:'center',
    margin:moderateScale(2),
  },
  text: {
    color: '#002058',
    fontSize: moderateScale(15),
    :'500',
    margin:moderateScale(2),
  },
  qualitySelector: {
    width: moderateScale(290),
    height: moderateScale(30),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: '#B5C7E6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'rgba(0, 32, 88, 1)',
    margin:moderateScale(2),
  },
  textContainer:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  text1: {
    fontSize: moderateScale(18),
    : 'bold',
    color: 'rgba(0, 32, 88, 1)',
    fontFamily: 'Ubuntu',
    textAlign: 'center',
  },
  icon: {
    color: 'rgba(0, 32, 88, 1)',
  },
  iconBG: {
    backgroundColor: '#B5C7E6',
    display:'flex',
    justifyContent:'center',
    paddingLeft:moderateScale(5),
    paddingRight:moderateScale(5),
    borderRadius:moderateScale(20),
  },
  buttonsContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    margin:moderateScale(10),
  },
  buttons:{
    borderRadius:moderateScale(20),
    height:moderateScale(30),
    width:moderateScale(100),
  },
  cancelButton:{
    borderColor:'#009E83',
    backgroundColor:'#FFFFFF',
    borderWidth:moderateScale(1),
  },
  okButton:{
    backgroundColor:'#009E83',
    borderWidth:moderateScale(0),
  },
  buttonsTextContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  buttonsCancelText:{
    color:'#009E83',
    fontSize:moderateScale(14),
  },
  buttonsOkText:{
    color:'#FFFFFF',
    fontSize:moderateScale(14),
  },
});

export default Gift;
