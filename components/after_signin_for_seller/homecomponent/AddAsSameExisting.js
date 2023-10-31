import React, {useContext, useCallback} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {moderateScale} from '../../../responsiveness/Metrics';
import CancelOkButtons from '../CancelOkButtons';
import CssStyles from '../../Styles';
import {
  ExpiryDate,
  MRPSelector,
  DiscountPercentage,
  PriceCalculation,
  UnitsSelection,
  QuantitySelector,
} from '../Fields';
import Context from '../../contextfolder/ContextProvider';
import {
  getProfileProducts,
  setProfileProducts,
} from '../../../services/ProductServices';

const AddAsSameExisting = ({cancleClick, okClick, opened}) => {
  const {
    authToken,
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
    setProductExpirydate,
    setIsAddPressed,
    setIsEditPressed,
    isEditPressed,
    isAddPressed,
    updateApi,
  } = useContext(Context);

  const onAddingSameNewInstance = useCallback(async () => {
    const isTrue = opened === 'adddfromexisting';
    console.log();
    const newData = {
      product_image: isTrue
        ? isEditPressed.item.product_image
        : isAddPressed.item.product_image,
      product_weight: isTrue
      ? isEditPressed.item.product_weight
      : isAddPressed.item.product_weight,
      master_product_id:isTrue
      ? isEditPressed.item.master_product_id
      : null,
      product_name: isTrue ? isEditPressed.item.product_name : isAddPressed.item.product_name,
      product_unit: productUnitSelection,
      product_mrp: productMrp,
      product_type: isTrue ? isEditPressed.item.product_type : isAddPressed.item.product_type,
      product_expiry_date: productExpiryDate,
      product_discount: productDiscount,
      product_discount_price: productDiscountedPrice,
      product_quantity : productSellQuantity,
      product_is_gifted: false,
      product_gift_quantity: productGiftQuantity,
    };
    if (!newData.master_product_id){
      delete newData.master_product_id;
    }
    try {
      const getProducts = await getProfileProducts({authToken});
      let profileProducts = getProducts.profileProducts.profileProducts;
      if (profileProducts?.length) {
        profileProducts = [...profileProducts, ...[newData]];
        } else {
        profileProducts = [newData];
      }
      const settingProducts = await setProfileProducts({
        authToken,
        profileProducts,
      });
      if (settingProducts.succes) {
        updateApi.reloadData();
        setProductMrp(null);
        setProductDiscount(null);
        setProductDiscountedPrice(null);
        setProductUnitSelection('');
        setProductSellQuantity(null);
        setProductGiftQuantity(null);
        setProductExpirydate('');
        setIsAddPressed({value: false, item: null, id:'', opened:'', currentDiscount: 0});
        opened === 'adddfromexisting' &&
          setIsEditPressed({value: false, item: null});
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [
    productExpiryDate,
    productMrp,
    productDiscount,
    productDiscountedPrice,
    productUnitSelection,
    productSellQuantity,
    productGiftQuantity,
    authToken,
    setIsAddPressed,
    setIsEditPressed,
    opened,
    isEditPressed,
    isAddPressed,
    setProductMrp,
    setProductDiscount,
    setProductDiscountedPrice,
    setProductUnitSelection,
    setProductSellQuantity,
    setProductGiftQuantity,
    updateApi,
    setProductExpirydate,
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{opened === 'adddfromexisting' ?
      isEditPressed.item.product_name : isAddPressed.item.product_name
      }</Text>
      <ExpiryDate />
      <MRPSelector />
      <DiscountPercentage />
      <PriceCalculation />
      <UnitsSelection />
      <QuantitySelector />
      <CancelOkButtons
        cancleClick={cancleClick}
        okClick={okClick}
        okText={opened === 'My Published Edit' ? 'Save Changes' : 'Publish'}
      />
      {opened !== 'My Published Edit' && <View style={styles.instanceButton}>
        <TouchableOpacity
          onPress={onAddingSameNewInstance}
          style={CssStyles.addProductsButton}>
          <Text style={CssStyles.addProductsButtonText}>
            {opened === 'adddfromexisting'
              ? 'Save and Add to "My Products"'
              : 'Add New Instance'}
          </Text>
        </TouchableOpacity>
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(15),
    margin: moderateScale(30),
    maxWidth: moderateScale(400),
    padding: moderateScale(5),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: moderateScale(8)},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  qualitySelectorCont: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: 'rgba(0, 32, 88, 1)',
    fontSize: moderateScale(20),
    textAlign: 'center',
    margin: moderateScale(2),
    fontFamily:'Ubuntu-Bold',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: moderateScale(10),
  },
  buttons: {
    borderRadius: moderateScale(20),
    height: moderateScale(30),
    width: moderateScale(100),
  },
  cancelButton: {
    borderColor: '#009E83',
    backgroundColor: '#FFFFFF',
    borderWidth: moderateScale(1),
  },
  okButton: {
    backgroundColor: '#009E83',
    borderWidth: moderateScale(0),
  },
  instanceButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsCancelText: {
    color: '#009E83',
    fontSize: moderateScale(14),
  },
  buttonsOkText: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
  },
});

export default AddAsSameExisting;
