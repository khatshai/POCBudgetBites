import React, {useState, useCallback, useContext,useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView, Image} from 'react-native';
import BasicAddTopTab from './BasicAddTopTab';
import CssStyles from '../../Styles';
import {moderateScale} from '../../../responsiveness/Metrics';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  DiscountPercentage,
  ExpiryDate,
  MRPSelector,
  PriceCalculation,
  ProductName,
  ProductType,
  QuantitySelector,
  UnitsSelection,
  WeightInGMS,
} from '../Fields';
import AddImgIconSVG from '../../../images/sellericons/AddImgIconSVG';
import {launchImageLibrary} from 'react-native-image-picker';
import EditSVG from '../../../images/sellericons/EditSVG';
import {useNavigation} from '@react-navigation/native';
import {
  getProfileProducts,
  setProfileProducts,
  setPublishedProducts,
} from '../../../services/ProductServices';
import Context from '../../contextfolder/ContextProvider';

function AddingNewProduct() {
  const navigation = useNavigation();

  const {
    authToken,
    productType,
    productName,
    productWeight,
    productExpiryDate,
    productMrp,
    productDiscount,
    productDiscountedPrice,
    productUnitSelection,
    productSellQuantity,
    productGiftQuantity,
    setProductType,
    setProductWeight,
    setProductName,
    setProductMrp,
    setProductDiscount,
    setProductDiscountedPrice,
    setProductUnitSelection,
    setProductSellQuantity,
    setProductGiftQuantity,
    updateApi,
    setIsMyProducts,
    setIsPublished,
    setProductExpirydate,
  } = useContext(Context);

  const [selectedImage, setSelectedImage] = useState(null);
  //const [isCameraOpen, setIsCameraOpen] = useState(false);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    launchImageLibrary(options, handleImagePickerResponse);
  };

  const handleImagePickerResponse = response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      setSelectedImage(imageUri);
    }
  };

  const addtoMyProductsHandler = useCallback(async () => {

    const newData = {
      product_image: selectedImage,
      product_weight: productWeight,
      product_name: productName,
      product_unit: productUnitSelection,
      product_mrp: productMrp ? productMrp : null,
      product_type: productType,
      product_expiry_date: productExpiryDate,
      product_discount: productDiscount ? productDiscount.toString() : null,
      product_discount_price: productDiscountedPrice
        ? productDiscountedPrice.toString()
        : null,
      product_quantity: productSellQuantity,
      product_is_gifted: false,
      product_gift_quantity: productGiftQuantity,
    };

    const getProducts = await getProfileProducts({authToken});
    let profileProducts = getProducts?.profileProducts?.profileProducts;
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
      setProductType('Packed Food');
      setProductWeight('');
      setProductName('');
      setProductMrp(null);
      setProductDiscount(null);
      setProductDiscountedPrice(null);
      setProductUnitSelection('');
      setProductExpirydate('');
      setProductSellQuantity(null);
      setProductGiftQuantity(null);
      navigation.navigate('Add_Existing_Product');
      // setIsMyProducts(true);
      // setIsPublished(false);
    }
  }, [
    navigation,
    authToken,
    productType,
    selectedImage,
    productName,
    productWeight,
    productExpiryDate,
    productMrp,
    productDiscount,
    productDiscountedPrice,
    productUnitSelection,
    productSellQuantity,
    productGiftQuantity,
    setProductType,
    setProductWeight,
    setProductName,
    setProductMrp,
    setProductDiscount,
    setProductDiscountedPrice,
    setProductUnitSelection,
    setProductSellQuantity,
    setProductGiftQuantity,
    updateApi,
    //setIsPublished,
    // setIsMyProducts,
    setProductExpirydate,
  ]);

  const addtoMyPublishedHandler = useCallback(async () => {

    const newData =
      {
        product_type: productType,
        product_image: selectedImage,
        product_name: productName,
        product_weight: productWeight,
        product_expiry_date: productExpiryDate,
        product_mrp: productMrp,
        product_discount: productDiscount,
        product_discount_price: productDiscountedPrice,
        product_unit: productUnitSelection,
        product_quantity: productSellQuantity,
        product_is_gifted: false,
      };
    const productQuantity =
        productSellQuantity && productGiftQuantity
          ? 'both'
          : productSellQuantity && !productGiftQuantity
          ? 'sell'
          : !productSellQuantity && productGiftQuantity
          ? 'gift'
          : 'none';
      const updatedDataCopy = {...newData};
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
        const updatedData = {...updatedDataCopy};
        updatedData.product_quantity = productSellQuantity;
        publishedData = [updatedData];
      }
      if (productQuantity === 'gift') {
        const updatedData = {...updatedDataCopy};
        updatedData.product_quantity = productGiftQuantity;
        updatedData.product_is_gifted = true;
        publishedData = [updatedData];
      }
      if (productQuantity === 'none') {
        const updatedData = {...updatedDataCopy};
        updatedData.product_quantity = productSellQuantity;
        publishedData = [updatedData];
      }
    const settingProducts = await setPublishedProducts({authToken, publishedData});

    if (settingProducts.succes) {
      updateApi.reloadData();
      setProductType('Packed Food');
      setProductWeight('');
      setProductName('');
      setProductMrp(null);
      setProductDiscount(null);
      setProductDiscountedPrice(null);
      setProductUnitSelection('');
      setProductSellQuantity(null);
      setProductGiftQuantity(null);
      navigation.navigate('Add_Existing_Product');
      // setIsMyProducts(false);
      // setIsPublished(true);
      setProductExpirydate('');
    }
  }, [
    setProductExpirydate,
    productName,
    productWeight,
    productExpiryDate,
    productMrp,
    productDiscount,
    productDiscountedPrice,
    productUnitSelection,
    productSellQuantity,
    productGiftQuantity,
    authToken,
    productType,
    selectedImage,
    navigation,
    setProductType,
    setProductWeight,
    setProductName,
    setProductMrp,
    setProductDiscount,
    setProductDiscountedPrice,
    setProductUnitSelection,
    setProductSellQuantity,
    setProductGiftQuantity,
    updateApi,
    // setIsMyProducts,
    // setIsPublished,
  ]);

  const [isMyProductsDisabled, setIsMyProductsDisabled] = useState(true);
  const [isMyPublishedDisabled, setIsMyPublishedDisabled] = useState(true);

  const [isDisabled, setIsDisabiled] = useState(true);
  useEffect(() => {
    if (
      productName !== '' &&
      productMrp !== ''
    ) {
      setIsDisabiled(false);
    }
  }, [
    isDisabled,
    productName,
    productMrp,
  ]);

  return (
    <>
      <View style={styles.container}>
        <View style={CssStyles.topTabcontainer}>
          <BasicAddTopTab color={'#002058'}/>
        </View>
        <ScrollView contentContainerStyle={CssStyles.scrollContainer}>
          <View style={styles.contentContainer}>
            {!selectedImage ? (
              <TouchableOpacity
                onPress={openImagePicker}
                style={styles.AddImgStyles}>
                <AddImgIconSVG />
              </TouchableOpacity>
            ) : (
              <View style={[styles.fieldSelector, styles.fieldSelectorWidth]}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.imageStyles}
                    source={{uri: selectedImage}}
                  />
                </View>
                <View style={styles.editContainer}>
                  <TouchableOpacity
                    style={styles.editableContainer}
                    onPress={openImagePicker}>
                    <EditSVG />
                    <Text style={styles.editableText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <ProductType />
            <ProductName />
            <WeightInGMS />
            <ExpiryDate />
            <MRPSelector />
            <DiscountPercentage />
            <PriceCalculation />
            <UnitsSelection />
            <QuantitySelector />
          </View>
        </ScrollView>
      </View>
      <View style={[styles.bottomTabcontainer, styles.buttonsContainer]}>
        <TouchableOpacity
        disabled={isDisabled}
          onPress={addtoMyProductsHandler}
          style={[styles.buttons, styles.addProductsButton]}>
          <View style={styles.buttonsTextContainer}>
            <Text style={styles.buttonsAddText}>Save & Add to My Products</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={addtoMyPublishedHandler}
          style={[styles.buttons, styles.publishButton]}>
          <View style={styles.buttonsTextContainer}>
            <Text style={styles.buttonsPublishText}>Save & Publish</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default AddingNewProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },
  AddImgStyles: {
    alignItems: 'center',
    marginTop: moderateScale(10),
    marginBottom: moderateScale(50),
  },
  bottomTabcontainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    borderTopWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: moderateScale(4)},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    position: 'relative',
    paddingVertical: moderateScale(10),
  },
  buttons: {
    borderRadius: moderateScale(20),
    height: moderateScale(34),
    width: moderateScale(345),
  },
  addProductsButton: {
    borderColor: '#009E83',
    backgroundColor: '#FFFFFF',
    borderWidth: moderateScale(2),
    margin: moderateScale(5),
  },
  publishButton: {
    backgroundColor: '#009E83',
    borderWidth: moderateScale(0),
    margin: moderateScale(5),
  },
  buttonsTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsAddText: {
    color: '#009E83',
    fontSize: moderateScale(14),
    fontFamily:'Ubuntu-Medium',
  },
  buttonsPublishText: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    fontFamily:'Ubuntu-Medium',
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    margin: moderateScale(30),
    padding: moderateScale(20),
    borderRadius: moderateScale(15),
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyles: {
    height: moderateScale(136),
    width: moderateScale(136),
    borderRadius: moderateScale(20),
  },
  editableContainer: {
    backgroundColor: '#EBF6F3',
    height: moderateScale(24),
    width: moderateScale(56),
    borderRadius: moderateScale(10),
    margin: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  editableText: {
    color: '#002058',
    marginLeft: moderateScale(4),
  },
  fieldSelector: {
    flexDirection: 'row',
    color: 'rgba(0, 32, 88, 1)',
    margin: moderateScale(2),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(50),
    width: '100%',
  },
  imageContainer: {
    width: '70%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  editContainer: {
    width: '30%',
    alignItems: 'flex-end',
  },
  disabledButton: {
    opacity: 0.5,
  },
});
