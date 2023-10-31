import React, {useContext, useCallback} from 'react';
import {View, Text} from 'react-native';
import CssStyles from '../Styles';
import CancelOkButtons from './CancelOkButtons';
import Context from '../contextfolder/ContextProvider';
import {
  getProfileProducts,
  setProfileProducts,
  setPublishedProducts,
} from '../../services/ProductServices';
import {useNavigation} from '@react-navigation/native';

function PublishProducts({item, isSaveClicked}) {
  const {
    productExpiryDate,
    productMrp,
    productDiscount,
    productDiscountedPrice,
    productUnitSelection,
    productSellQuantity,
    productGiftQuantity,
    setProductMrp,
    setProductDiscount,
    setProductDiscountedPrice,
    setProductUnitSelection,
    setProductSellQuantity,
    setProductGiftQuantity,
    authToken,
    updateApi,
    setProductExpirydate,
    selectedItems,
  } = useContext(Context);

  const navigation = useNavigation();

  const cancelClick = () => {
    navigation.navigate('Tab');
  };

  const yesClick = useCallback(async () => {
    const updatedData = {
      product_image: item.product_image,
      product_weight: item.product_weight,
      master_product_id: item.master_product_id,
      product_name: item.product_name,
      product_unit: productUnitSelection,
      product_mrp: productMrp,
      product_type: item.product_type,
      product_expiry_date: productExpiryDate,
      product_discount: productDiscount,
      product_discount_price: productDiscountedPrice,
      product_quantity: productSellQuantity,
      product_is_gifted: false,
      product_id: item.product_id,
      product_gift_quantity: productGiftQuantity,
    };
    if (!updatedData.master_product_id){
      delete updatedData.master_product_id;
    }
    if (isSaveClicked === 'SaveClicked') {
      try {
        const getProducts = await getProfileProducts({authToken});
        let profileProducts = getProducts.profileProducts.profileProducts;
        if (profileProducts?.length) {
          const index = profileProducts.findIndex(
            profileitem => profileitem.product_id === updatedData.product_id,
          );
          if (index !== -1) {
            profileProducts[index] = updatedData;
          }
          profileProducts = [...profileProducts];
        }
        const settingProducts = await setProfileProducts({
          authToken,
          profileProducts,
        });
        if (settingProducts.succes) {
          setProductMrp(null);
          setProductDiscount(null);
          setProductDiscountedPrice(null);
          setProductUnitSelection('');
          setProductSellQuantity(null);
          setProductGiftQuantity(null);
          setProductExpirydate(undefined);
          updateApi.reloadData();
          navigation.navigate('Tab');
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    } else {
      const productQuantity =
        productSellQuantity && productGiftQuantity
          ? 'both'
          : productSellQuantity && !productGiftQuantity
          ? 'sell'
          : !productSellQuantity && productGiftQuantity
          ? 'gift'
          : 'none';
      const updatedDataCopy = {...updatedData};
      delete updatedDataCopy.product_gift_quantity;
      let publishedData = [];
      if (productQuantity === 'both') {
        const data1 = {...updatedDataCopy};
        data1.product_quantity = productSellQuantity;
        const data2 = {...updatedDataCopy};
        data2.product_quantity = productGiftQuantity;
        data2.product_is_gifted = true;
        publishedData = [data1, data2];
      }
      if (productQuantity === 'sell') {
        const data = {...updatedDataCopy};
        publishedData = [data];
      }
      if (productQuantity === 'gift') {
        const data = {...updatedDataCopy};
        data.product_quantity = productGiftQuantity;
        data.product_is_gifted = true;
        publishedData = [data];
      }
      if (productQuantity === 'none') {
        const data = {...updatedDataCopy};
        data.product_is_gifted = false;
        publishedData = [data];
      }
      try {
        const settingProducts = await setPublishedProducts({
          authToken,
          publishedData,
        });
        if (settingProducts.succes) {
          setProductMrp(null);
          setProductDiscount(null);
          setProductDiscountedPrice(null);
          setProductUnitSelection('');
          setProductSellQuantity(null);
          setProductGiftQuantity(null);
          setProductExpirydate(undefined);
          navigation.navigate('Tab');
          updateApi.reloadData();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }, [
    productExpiryDate,
    productMrp,
    productDiscount,
    productDiscountedPrice,
    productUnitSelection,
    productSellQuantity,
    productGiftQuantity,
    setProductMrp,
    setProductDiscount,
    setProductDiscountedPrice,
    setProductUnitSelection,
    setProductSellQuantity,
    setProductGiftQuantity,
    item,
    isSaveClicked,
    authToken,
    navigation,
    updateApi,
    setProductExpirydate,
  ]);

  return (
    <View style={CssStyles.BlurContainer}>
      <Text style={CssStyles.blurTitle}>
        {isSaveClicked === 'SaveClicked' ? 'Save Changes?' : 'Publish Product?'}
      </Text>
      <Text style={CssStyles.blurPassage}>
        {isSaveClicked === 'SaveClicked'
          ? 'Are you sure you want to save the changes that have been made?'
          : 'Are you sure you want to publish the product?'}
      </Text>
      <CancelOkButtons
        cancelText={'No'}
        okText={'Yes'}
        cancleClick={cancelClick}
        okClick={yesClick}
      />
    </View>
  );
}
export default PublishProducts;
