import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import {
  findNodeHandle,
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import BasicAddTopTab from './BasicAddTopTab';
import CssStyles from '../../Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from '../../../responsiveness/Metrics';
import {
  getProfileProducts,
  recommendedList,
  setProfileProducts,
  setPublishedProducts,
} from '../../../services/ProductServices';
import EditSVG from '../../../images/sellericons/EditSVG';
import {useNavigation} from '@react-navigation/native';
import Context from '../../contextfolder/ContextProvider';
import {BlurView} from '@react-native-community/blur';
import AddAsSameExisting from '../homecomponent/AddAsSameExisting';
import { OnProductAddedSucess } from '../../NotificationMessage';

function RenderItems({item, onAddtoMyProductsSucess}) {
  const {setIsEditPressed, setProductUnitSelection, authToken, updateApi, setProductMrp} =
    useContext(Context);

  const onEditPress = () => {
    setProductMrp(item.product_mrp);
    setProductUnitSelection(item.product_unit);
    setIsEditPressed({value: true, item: item});
  };

  const onAddToMyProductsPress = useCallback(async () => {
    const newData = {
      product_type: item.product_type,
      product_image: item.product_image,
      product_name: item.product_name,
      product_mrp: item.product_mrp,
      product_weight: item.product_weight,
      product_unit: item.product_unit,
      master_product_id:item.master_product_id,
    };

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
    if (settingProducts.succes){
      updateApi.reloadData();
      onAddtoMyProductsSucess();
    }
  }, [authToken, item, updateApi, onAddtoMyProductsSucess]);

  return (
    <>
      <View>
        <Image
          style={styles.imageStyles}
          resizeMethod="auto"
          source={
            item.product_image
              ? {uri: item.product_image}
              : require('../../../images/EmptyImage.jpg')
          }
        />
      </View>
      <View>
        <View style={styles.productTypeContainer}>
          <Text style={styles.productTypeText}>{item.product_type}</Text>
        </View>
        <Text style={styles.title}>{item.product_name}</Text>
        {/* {item.product_expiry_date && <Text style={styles.text}>Expiry Date: {item.product_expiry_date}</Text>} */}
        <Text style={styles.text}>MRP: <Text style={styles.text2}>{item.product_mrp}</Text></Text>
        {/* {item.product_sell_quantity && <Text style={styles.text}>Quantity: {item.product_sell_quantity}</Text>} */}
        {/* {item.product_discount && <Text style={styles.text}>Discount: {item.product_discount}</Text>} */}
        <View style={styles.editable}>
          <TouchableOpacity
            onPress={onEditPress}
            style={[styles.containerDirection, styles.editableContainer]}>
            <EditSVG />
            <Text style={styles.editableText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={onAddToMyProductsPress}
          style={[styles.addProductsContainer]}>
          <Text style={styles.editableText}>Add to My Products</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function AddExistingProduct() {
  const navigating = useNavigation();
  const {
    isEditPressed,
    setIsEditPressed,
    isRecomendedClicked,
    setIsRecomendedClicked,
    authToken,
    setProductMrp,
    setProductDiscount,
    setProductDiscountedPrice,
    setProductUnitSelection,
    setProductSellQuantity,
    setProductGiftQuantity,
    productExpiryDate,
    productMrp,
    productDiscount,
    productDiscountedPrice,
    productUnitSelection,
    productGiftQuantity,
    productSellQuantity,
    updateApi,
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

  const [onProctsAdded, setOnProductAdded] = useState(false);

  const onAddtoMyProductsSucess = () => {
    setOnProductAdded(true);
  };

  const onCloseAddtoMyProductsNotif = () => {
    setOnProductAdded(false);
  };

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //const [isRecomendedClicked, setIsRecomendedClicked] = useState(true);
  const [isExistingClicked, setIsExistingClicked] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        let jsonData;
        if (isRecomendedClicked) {
          const recommjsonData = await recommendedList({authToken});
          // jsonData = await recommendedData.json();
          jsonData = recommjsonData.masterProductList;
        }
        if (isExistingClicked) {
          // const recommjsonData = await recommendedList({authToken});
          // jsonData = recommjsonData.masterProductList;
          const getProducts = await getProfileProducts({authToken});
          let profileProducts = getProducts.profileProducts.profileProducts;
          jsonData = profileProducts;
        }
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    }
    fetchData();
  }, [isRecomendedClicked, isExistingClicked, authToken]);

  const onRecomendedHandler = () => {
    setIsRecomendedClicked(true);
    setIsExistingClicked(false);
  };

  const onAddExistingHandler = () => {
    setIsRecomendedClicked(false);
    setIsExistingClicked(true);
  };

  const onAddNewProductHandler = () => {
    setIsRecomendedClicked(true);
    setIsExistingClicked(false);
    navigating.navigate('Adding_New_Product');
  };

  const cancleClick = () => {
    setProductMrp(null);
    setProductDiscount(null);
    setProductDiscountedPrice(null);
    setProductUnitSelection('');
    setProductSellQuantity(null);
    setProductGiftQuantity(null);
    setIsEditPressed({value: false, item: null});
  };

  const okClick = useCallback(async () => {
    const newData =
      {
        product_id: isEditPressed.item.product_id || null,
        product_type: isEditPressed.item.product_type,
        product_image: isEditPressed.item.product_image,
        product_weight: isEditPressed.item.product_weight,
        product_mrp: productMrp,
        product_name: isEditPressed.item.product_name,
        product_unit: productUnitSelection,//until now from master products
        product_expiry_date: productExpiryDate,
        product_discount: productDiscount,
        product_discount_price: productDiscountedPrice,
        product_quantity:productSellQuantity,
        product_is_gifted: false,
        product_gift_quantity: productGiftQuantity,
      };
      !newData.product_id && delete newData.product_id;
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
        updatedData.product_is_gifted = productGiftQuantity;
        publishedData = [updatedData];
      }
      if (productQuantity === 'none') {
        const updatedData = {...updatedDataCopy};
        updatedData.product_quantity = productSellQuantity;
        publishedData = [updatedData];
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
        updateApi.reloadData();
        setIsEditPressed({value: false, item: null});
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [
    isEditPressed,
    authToken,
    productDiscount,
    productDiscountedPrice,
    productExpiryDate,
    productGiftQuantity,
    productSellQuantity,
    setIsEditPressed,
    productMrp,
    productUnitSelection,
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
    <>
      <View
        style={styles.container}
        ref={imageRef}
        onLayout={() => setViewRef(findNodeHandle(imageRef.current))}>
        <View style={CssStyles.topTabcontainer}>
          <BasicAddTopTab color={'#009E83'} />
          <View style={[styles.padding]}>
            <View style={styles.flex}>
              <TouchableOpacity
                onPress={onRecomendedHandler}
                style={[
                  CssStyles.selectionButton,
                  styles.recomendedProductsWidth,
                  isRecomendedClicked
                    ? styles.bgColorSelected
                    : styles.bgColorUnSelected,
                ]}>
                <Text style={[styles.filterText, styles.addIconColor]}>
                  Recomended
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onAddExistingHandler}
                style={[
                  CssStyles.selectionButton,
                  styles.addExistingWidth,
                  isExistingClicked
                    ? styles.bgColorSelected
                    : styles.bgColorUnSelected,
                ]}>
                <Text style={[styles.filterText, styles.addIconColor]}>
                  Existing
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onAddNewProductHandler}>
                <Ionicons
                  name="add-circle"
                  size={50}
                  style={styles.addIconColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={[CssStyles.scrollContainer, styles.listBg]}>
          {isLoading ? (
            <View style={styles.indicatorStyles}>
              <ActivityIndicator size="large" color="#002058" />
            </View>
          ) : data && data.length ? (
            <View styles={styles.flastListStyles}>
              {data.map((item, index) => (
                <View key={index} style={styles.singleProductContainer}>
                  <RenderItems onAddtoMyProductsSucess={onAddtoMyProductsSucess} item={item} />
                </View>
              ))}
            </View>
          ) : null}
        </ScrollView>
      </View>
      {(viewRef || Platform.OS === 'ios') && isEditPressed.value && (
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
              cancleClick={cancleClick}
              okClick={okClick}
              opened={'adddfromexisting'}
            />
          </View>
        </BlurView>
      )}
      {
        onProctsAdded && <OnProductAddedSucess viewRef={viewRef} close={onCloseAddtoMyProductsNotif}/>
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FC',
    flex: 1,
  },
  listBg: {
    alignItems: 'center',
  },
  padding: {
    paddingHorizontal: moderateScale(5),
    paddingBottom: moderateScale(5),
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recomendedProductsWidth: {
    width: moderateScale(128),
    marginHorizontal: moderateScale(5),
  },
  addExistingWidth: {
    width: moderateScale(96),
    marginHorizontal: moderateScale(5),
  },
  bgColorSelected: {
    backgroundColor: '#EBF6F3',
  },
  bgColorUnSelected: {
    backgroundColor: '#FFFFFF',
  },
  addIconColor: {
    color: '#009E83',
  },
  deleteBackGround: {
    backgroundColor: '#F9F1F1',
    height: moderateScale(24),
    width: moderateScale(95),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(10),
    margin: moderateScale(5),
  },
  deleteContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIconStyles: {
    color: '#CF0000',
  },
  deleteText: {
    color: '#CF0000',
  },
  imageStyles: {
    height: moderateScale(122),
    width: moderateScale(122),
    borderRadius: moderateScale(20),
  },
  containerDirection: {
    flexDirection: 'row',
  },
  editableContainer: {
    backgroundColor: '#EBF6F3',
    height: moderateScale(24),
    width: moderateScale(100),
    borderRadius: moderateScale(10),
    margin: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  editable:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  editableText: {
    color: '#002058',
    marginLeft: moderateScale(4),
    fontFamily:'Ubuntu-Medium',
    fontSize:moderateScale(11),
  },
  flastListStyles: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleProductContainer: {
    backgroundColor: '#FFFFFF',
    height: moderateScale(180),
    width: moderateScale(345),
    marginVertical: moderateScale(10),
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  addProductsContainer: {
    backgroundColor: '#EBF6F3',
    height: moderateScale(24),
    width: moderateScale(137),
    borderRadius: moderateScale(10),
    margin: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  editcontainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(15),
    marginHorizontal: moderateScale(30),
    marginVertical: moderateScale(100),
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
    fontSize: moderateScale(16),
    margin: moderateScale(2),
    fontFamily:'Ubuntu-Bold'
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
  productTypeContainer: {
    height: moderateScale(25),
    minwidth: moderateScale(60),
    backgroundColor: '#F9F9F9',
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  productTypeText: {
    fontSize: moderateScale(12),
    color: '#002058',
    padding: moderateScale(2),
    fontFamily:'Ubuntu-Medium',
  },
  text: {
    fontSize: moderateScale(14),
    color: '#002058',
    margin: moderateScale(2),
    fontFamily:'Ubuntu-Regular',
  },
  text2: {
    fontSize: moderateScale(14),
    color: '#002058',
    margin: moderateScale(2),
    fontFamily:'Ubuntu-Medium',
  },
});

export default AddExistingProduct;

//89765546
