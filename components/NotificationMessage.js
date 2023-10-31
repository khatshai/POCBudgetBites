import React, {useState, useEffect, useCallback, useContext} from 'react';
import {View, Platform, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import CssStyles from './Styles';
import { moderateScale } from '../responsiveness/Metrics';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { deleteElement } from '../services/ProductServices';
import Context from './contextfolder/ContextProvider';
import BuyerContext from './contextfolder/BuyerContextProvider';


export function OnSucessfullyRegister({onRegistrationComplete, viewRef}) {

  const [isViewContentCentered, setIsViewContentCentered] = useState(false);
  const handleViewContentLayout = () => {
    setIsViewContentCentered(true);
  };

  useEffect(()=>{
    const timer = setTimeout(()=>{
      onRegistrationComplete();
    },5000);
    return () => clearTimeout(timer);
  },[onRegistrationComplete]);

  return (
    <>
      {(viewRef || Platform.OS === 'ios') && (
        <BlurView
          style={CssStyles.absolute}
          viewRef={viewRef}
          blurType="light"
          blurAmount={3}
          blurRadius={5}>
          <View
            style={[
              CssStyles.centeredView,
              isViewContentCentered && CssStyles.centeredViewOpacity,
            ]}
            onLayout={handleViewContentLayout}>
            <View style={[styles.blurContainer, styles.registerSucess]}>
            <MaterialCommunityIcons color="#05D96F" size={moderateScale(27)} name="checkbox-marked-circle"/>
            <Text style={styles.text}>Registration Successful!</Text>
            </View>
          </View>
        </BlurView>
      )}
    </>
  );
}

export function OnAlertIcon({viewRef, alertOkClicked}) {

  const [isViewContentCentered, setIsViewContentCentered] = useState(false);
  const handleViewContentLayout = () => {
    setIsViewContentCentered(true);
  };

  const onOkClicked = () => {
    alertOkClicked();
  };

  return (
    <>
      {(viewRef || Platform.OS === 'ios') && (
        <BlurView
          style={CssStyles.absolute}
          viewRef={viewRef}
          blurType="light"
          blurAmount={3}
          blurRadius={5}>
          <View
            style={[
              CssStyles.centeredView,
              isViewContentCentered && CssStyles.centeredViewOpacity,
            ]}
            onLayout={handleViewContentLayout}>
            <View style={styles.blurContainer}>
            <View style={styles.flexAlignment}>
            <MaterialCommunityIcons style={styles.iconMargin} color="#CF0000" size={moderateScale(27)} name="alert-circle"/>
            <Text style={styles.text}>Additional Information required</Text>
            </View>
            <View>
              <Text style={styles.passageText}>
                Product/s selected from the list have some Information
                missing to publish for sale or gift
              </Text>
            </View>
            <TouchableOpacity onPress={onOkClicked} style={styles.buttonOk}>
              <Text style={styles.buttonOkText}>Ok</Text>
            </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      )}
    </>
  );
}

export function OnProductAddedSucess({close, viewRef}) {

  const [isViewContentCentered, setIsViewContentCentered] = useState(false);
  const handleViewContentLayout = () => {
    setIsViewContentCentered(true);
  };

  useEffect(()=>{
    const timer = setTimeout(()=>{
      close();
    },2000);
    return () => clearTimeout(timer);
  },[close]);

  return (
    <>
      {(viewRef || Platform.OS === 'ios') && (
        <BlurView
          style={CssStyles.absolute}
          viewRef={viewRef}
          blurType="light"
          blurAmount={3}
          blurRadius={5}>
          <View
            style={[
              CssStyles.centeredView,
              isViewContentCentered && CssStyles.centeredViewOpacity,
            ]}
            onLayout={handleViewContentLayout}>
            <View style={[styles.blurContainer, styles.registerSucess]}>
            <MaterialCommunityIcons color="#05D96F" size={moderateScale(27)} name="checkbox-marked-circle"/>
            <Text style={styles.text}>Product Added Sucessfully</Text>
            </View>
          </View>
        </BlurView>
      )}
    </>
  );
}

export function OnDelteNotification({viewRef}) {

  const {authToken,deleteConfirmation, setDeleteConfirmation,
    updateApi} = useContext(Context);

  const [isViewContentCentered, setIsViewContentCentered] = useState(false);
  const handleViewContentLayout = () => {
    setIsViewContentCentered(true);
  };

  const onNoClicked = () => {
    setDeleteConfirmation({doc_id:'', doc_name:'', isDelete:false});
  };

  const onYesClicked = useCallback(async () => {
     const deleteData = {
      document_id: deleteConfirmation.doc_id,
      product_id: deleteConfirmation.doc_name,
    };
    const response = await deleteElement({deleteData, authToken});
    if (response.succes){
      updateApi.reloadData();
      setDeleteConfirmation({doc_id:'', doc_name:'', isDelete:false});
    }
  },[deleteConfirmation, authToken, updateApi, setDeleteConfirmation]);

  return (
    <>
      {(viewRef || Platform.OS === 'ios') && (
        <BlurView
          style={CssStyles.absolute}
          viewRef={viewRef}
          blurType="light"
          blurAmount={3}
          blurRadius={5}>
          <View
            style={[
              CssStyles.centeredView,
              isViewContentCentered && CssStyles.centeredViewOpacity,
            ]}
            onLayout={handleViewContentLayout}>
            <View style={styles.blurContainer}>
            <View style={styles.flexAlignment}>
            <Text style={styles.DeleteText}>Delete Product?</Text>
            </View>
            <View>
              <Text style={styles.passageText}>
                Are you sure you want to delete the selected product/s?
              </Text>
            </View>
            <View style={styles.flexAlignment}>
            <TouchableOpacity onPress={onNoClicked} style={styles.buttonNo}>
              <Text style={styles.buttonNoText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonOk} onPress={onYesClicked}>
              <Text style={styles.buttonOkText}>Yes</Text>
            </TouchableOpacity>
            </View>
            </View>
          </View>
        </BlurView>
      )}
    </>
  );
}


export function OnBuyerConfirmPickUpNotification({viewRef}) {

  // const {authToken,setOrderReqruestConfirm, setDeleteConfirmation} = useContext(Context);
  const {setIsOrderRequestClicked} = useContext(BuyerContext);

  const [isViewContentCentered, setIsViewContentCentered] = useState(false);
  const handleViewContentLayout = () => {
    setIsViewContentCentered(true);
  };

  const onNoClicked = () => {
    //setDeleteConfirmation({doc_id:'', doc_name:'', isDelete:false});
    setIsOrderRequestClicked({isorder:false});
  };

  const onYesClicked = useCallback(async () => {
    //  const deleteData = {
    //   document_id: deleteConfirmation.doc_id,
    //   product_id: deleteConfirmation.doc_name,
    // };
    // const response = await deleteElement({deleteData});
    // if (response.succes){
    //   // updateApi.reloadData();
    //   setDeleteConfirmation({doc_id:'', doc_name:'', isDelete:false});
    // }
    setIsOrderRequestClicked({isorder:false});
    console.log('ordered');
  },[setIsOrderRequestClicked]);

  return (
    <>
      {(viewRef || Platform.OS === 'ios') && (
        <BlurView
          style={CssStyles.absolute}
          viewRef={viewRef}
          blurType="light"
          blurAmount={3}
          blurRadius={5}>
          <View
            style={[
              CssStyles.centeredView,
              isViewContentCentered && CssStyles.centeredViewOpacity,
            ]}
            onLayout={handleViewContentLayout}>
            <View style={styles.blurContainer}>
            <View style={styles.flexAlignment}>
            <Text style={styles.DeleteText}>Confirm Pick-Up?</Text>
            </View>
            <View>
              <Text style={styles.passageText}>
                You can pick-up your order once the shopkeeper
                accepts your Pick-Up request.
              </Text>
            </View>
            <View style={styles.flexAlignment}>
            <TouchableOpacity onPress={onNoClicked} style={styles.buttonCancelOrder}>
              <Text style={styles.buttonCancelOrderText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonOrder} onPress={onYesClicked}>
              <Text style={styles.buttonOrderText}>Yes</Text>
            </TouchableOpacity>
            </View>
            </View>
          </View>
        </BlurView>
      )}
    </>
  );
}


const styles = StyleSheet.create({
  blurContainer: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(15),
    borderColor:'#e7efff',
    borderWidth:3,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 3,
    shadowRadius: 5,
    elevation: 9,
    width: moderateScale(345),
  },
  registerSucess:{
    height:moderateScale(87),
  },
  alert:{
    margin:moderateScale(20),
    height:moderateScale(167),
  },
  text:{
    textAlign:'center',
    fontFamily:'Ubuntu-Bold',
    fontSize:moderateScale(16),
    color:'#002058',
    marginTop:moderateScale(5),
  },
  flexAlignment:{
    display:'flex',
    flexDirection:'row',
    margin:moderateScale(10),
  },
  iconMargin:{
    marginRight:moderateScale(10),
  },
  buttonOk: {
    backgroundColor: '#009E83',
    justifyContent: 'center',
    width: moderateScale(146),
    height: moderateScale(34),
    borderRadius: moderateScale(20),
    marginLeft: moderateScale(20),
  },
  buttonOkText: {
    color: '#F8F9FC',
    textAlign: 'center',
    fontSize: moderateScale(14),
    fontFamily:'Ubuntu-Medium',
    margin:moderateScale(10),
  },
  passageText:{
    fontFamily:'Ubuntu-Regular',
    fontSize:moderateScale(14),
    textAlign:'center',
    color:'#002058',
    margin:moderateScale(5),
  },
  DeleteText:{
    fontSize:moderateScale(20),
    fontFamily:'Ubuntu-Bold',
    color:'#002058',
  },
  buttonNo: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    width: moderateScale(146),
    height: moderateScale(34),
    borderRadius: moderateScale(20),
    borderWidth:moderateScale(2),
    borderColor:'#009E83',
    marginBottom:moderateScale(5),
  },
  buttonNoText: {
    color: '#009E83',
    textAlign: 'center',
    fontSize: moderateScale(14),
    fontFamily:'Ubuntu-Medium',
  },
  buttonOrder: {
    backgroundColor: '#FF5700',
    justifyContent: 'center',
    width: moderateScale(146),
    height: moderateScale(34),
    borderRadius: moderateScale(20),
    marginLeft: moderateScale(20),
  },
  buttonOrderText: {
    color: '#F8F9FC',
    textAlign: 'center',
    fontSize: moderateScale(14),
    fontFamily:'Ubuntu-Medium',
    margin:moderateScale(10),
  },
  buttonCancelOrder: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    width: moderateScale(146),
    height: moderateScale(34),
    borderRadius: moderateScale(20),
    borderWidth:moderateScale(2),
    borderColor:'#FF5700',
    marginBottom:moderateScale(5),
  },
  buttonCancelOrderText: {
    color: '#FF5700',
    textAlign: 'center',
    fontSize: moderateScale(14),
    fontFamily:'Ubuntu-Medium',
  },
});
