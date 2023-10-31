import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {StyleSheet, View, Platform, findNodeHandle} from 'react-native';
import {moderateScale} from '../../../responsiveness/Metrics';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../homecomponent/Home';
import Profile from '../profilecomponent/Profile';
import SaleReport from '../salesreportcomponent/SaleReport';
import HomeSVG from '../../../images/sellericons/HomeSVG';
import ProfileSVG from '../../../images/sellericons/ProfileSVG';
import SaleReportIconSVG from '../../../images/sellericons/SaleReportIconSVG';
import AddIconSVG from '../../../images/sellericons/AddIconSVG';
import Context from '../../contextfolder/ContextProvider';
import CssStyles from '../../Styles';
import {BlurView} from '@react-native-community/blur';
import AddAsSameExisting from '../homecomponent/AddAsSameExisting';
import {setPublishedProducts, updatingPublishedProduct} from '../../../services/ProductServices';
import AddExistingProduct from '../addproductscomponent/AddFromExistingProduct';
import { OnDelteNotification } from '../../NotificationMessage';
import { useRoute } from '@react-navigation/native';

const Tabs = createBottomTabNavigator();

const Tab = () => {
  const {
    isAllSelected,
    isOneByOneSelected,
    setIsAddPressed,
    isAddPressed,
    setProductMrp,
    setProductDiscount,
    setProductDiscountedPrice,
    setProductUnitSelection,
    setProductSellQuantity,
    setProductGiftQuantity,
    updateApi,
    authToken,
    productExpiryDate,
    productMrp,
    productDiscount,
    productUnitSelection,
    productDiscountedPrice,
    productSellQuantity,
    productGiftQuantity,
    deleteConfirmation,
    setProductExpirydate,
  } = useContext(Context);

  const [viewRef, setViewRef] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    setViewRef(findNodeHandle(imageRef.current));
  }, []);

  const [isViewContentCentered, setIsViewContentCentered] = useState(false);

  const handleViewContentLayout = () => {
    setIsViewContentCentered(true);
  };

  const cancleClick = () => {
    setProductMrp(null);
    setProductDiscount(null);
    setProductDiscountedPrice(null);
    setProductUnitSelection('');
    setProductSellQuantity(null);
    setProductGiftQuantity(null);
    setProductExpirydate('');
    setIsAddPressed({value: false, item: null, id:'', opened: '', currentDiscount:0});
  };

  const okClick = useCallback(async () => {
     const isOpenedFromMyProducts =
      isAddPressed.opened === 'My Products Add' ? true : false;
    const data = isAddPressed.item;
    const productQuantity =
        productSellQuantity && productGiftQuantity
          ? 'both'
          : productSellQuantity && !productGiftQuantity
          ? 'sell'
          : !productSellQuantity && productGiftQuantity
          ? 'gift'
          : 'none';
    //const item = isOpenedFromMyProducts ? data : data.data.data[0];
    try {
      let settingProducts = {};
      if (isOpenedFromMyProducts) {
        const newData =
          {
            product_id: data.product_id,
            product_type: data.product_type,
            product_image: data.product_image,
            product_name: data.product_name,
            product_weight: data.product_weight,
            product_expiry_date: productExpiryDate,
            product_mrp: productMrp,
            product_discount: productDiscount,
            product_discount_price: productDiscountedPrice,
            product_unit: productUnitSelection,
            product_quantity: productSellQuantity,
            product_is_gifted: false,
            product_gift_quantity: productGiftQuantity,
          };
      const updatedDataCopy = {...newData};
      let publishedData = [];
      if (productQuantity === 'both') {
        const data1 = {...updatedDataCopy};
        data1.product_quantity = productSellQuantity;
        const data2 = {...updatedDataCopy};
        data2.product_is_gifted = true;
        data2.product_quantity = productGiftQuantity;
        publishedData = [data1, data2];
      }
      if (productQuantity === 'sell') {
        const updatedData = {...updatedDataCopy};
        updatedData.product_quantity = productSellQuantity;
        publishedData = [updatedData];
      }
      if (productQuantity === 'gift') {
        const updatedData = {...updatedDataCopy};
        updatedData.product_is_gifted = true;
        updatedData.product_quantity = productGiftQuantity;
        publishedData = [updatedData];
      }
      if (productQuantity === 'none') {
        const updatedData = {...updatedDataCopy};
        updatedData.product_quantity = productGiftQuantity;
        publishedData = [updatedData];
      }
       settingProducts = await setPublishedProducts({
          authToken,
          publishedData,
        });
      } else {
       const updatedData = {
          document_id: isAddPressed.id,
          product_id: data.product_id,
          product_info: {
            product_is_gifted: data.product_is_gifted ? true : false,
            product_discount: productDiscount,
            product_discount_price: productDiscountedPrice,
            product_expiry_date: productExpiryDate,
            product_weight: data.product_weight,
            product_image: data.product_image,
            product_mrp: productMrp,
            isActive: data.isActive,
            product_unit: productUnitSelection,
            product_name: data.product_name,
            product_quantity: data.product_is_gifted ? productGiftQuantity : productSellQuantity,
            product_type: data.product_type,
            sellerId: data.sellerId,
            product_id: data.product_id,
            status: data.status,
          },
        };
        settingProducts = await updatingPublishedProduct({
          authToken,
          updatedData,
        });
      }
     if (settingProducts.succes) {
        setProductMrp(null);
        setProductDiscount(null);
        setProductDiscountedPrice(null);
        setProductUnitSelection('');
        setProductSellQuantity(null);
        setProductGiftQuantity(null);
        setProductExpirydate('');
        updateApi.reloadData();
        setIsAddPressed({value: false,id:'', item: null, opened: '', currentDiscount:0});
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [
    isAddPressed,
    setIsAddPressed,
    setProductMrp,
    setProductDiscount,
    setProductDiscountedPrice,
    setProductUnitSelection,
    setProductSellQuantity,
    setProductGiftQuantity,
    productMrp,
    productDiscount,
    productDiscountedPrice,
    productUnitSelection,
    productSellQuantity,
    productGiftQuantity,
    productExpiryDate,
    authToken,
    updateApi,
    setProductExpirydate,
  ]);

  // const onAddNewProductsClickHandler = () =>{
  //   setIsAddClicked(true);
  // };

  const renderTabIcon = (route, color) => {
    if (route.name === 'Home') {
      return <HomeSVG iconColor={color} />;
    }
    if (route.name === 'Sale Report') {
      return <SaleReportIconSVG iconColor={color} />;
    }
    if (route.name === 'Profile') {
      return <ProfileSVG iconColor={color} />;
    }
    if (route.name === 'Add Products') {
      return (
        <View style={styles.addIconContainer}>
          <AddIconSVG />
        </View>
      );
    }
  };

  return (
    <>
      <View
        style={styles.container}
        ref={imageRef}
        onLayout={() => setViewRef(findNodeHandle(imageRef.current))}>
        {!(isAllSelected || isOneByOneSelected) && (
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
              tabBarActiveTintColor: '#009e83',
              tabBarInactiveTintColor: '#91ccbc',
              tabBarLabelStyle: {
                fontSize: moderateScale(12),
                marginBottom: moderateScale(15),
                fontFamily:'Ubuntu-Medium',
              },
            })}>
            <Tabs.Screen name="Home" component={Home}/>
            <Tabs.Screen name="Sale Report" component={SaleReport} />
            <Tabs.Screen name="Profile" component={Profile} />
             <Tabs.Screen
              name="Add Products"
              component={AddExistingProduct}
              />
          </Tabs.Navigator>
        )}
        {!(isAllSelected || isOneByOneSelected) ? null : (
          <Home scroll={false} />
        )}
      </View>
      {(viewRef || Platform.OS === 'ios') && isAddPressed.value && (
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
            <AddAsSameExisting
              opened={isAddPressed.opened}
              cancleClick={cancleClick}
              okClick={okClick}
            />
          </View>
        </BlurView>
      )}
      {deleteConfirmation.isDelete &&
        <OnDelteNotification
        viewRef={viewRef}/>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },
  tabShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    borderTopWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  addIconContainer: {
    position: 'absolute',
    top: -35,
  },
});

export default Tab;
