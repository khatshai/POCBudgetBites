import React, {useEffect, useState, useContext, useCallback} from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {moderateScale} from '../../../responsiveness/Metrics';
import EditSVG from '../../../images/sellericons/EditSVG';
import AddSVG from '../../../images/sellericons/AddSVG';
import LinearGradient from 'react-native-linear-gradient';
import Context from '../../contextfolder/ContextProvider';
import CssStyles from '../../Styles';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  currentDiscountTrend,
  getProfileProducts,
  getPublishedProducts,
} from '../../../services/ProductServices';
import {TextInput} from 'react-native-gesture-handler';

function RenderItems({item, isSelected, id}) {
  const navigation = useNavigation();

  const [value, setValue] = useState('0');

  const onValueChange = text => {
    setValue(text);
  };

  const {
    setIsAddPressed,
    isMyPublished,
    setProductMrp,
    setProductDiscount,
    setProductDiscountedPrice,
    setProductUnitSelection,
    setProductSellQuantity,
    setProductWeight,
    setProductGiftQuantity,
    isMyProducts,
    setDeleteConfirmation,
    setProductExpirydate,
    userDetails,
  } = useContext(Context);

  const onAddPress = currentDiscount => {
    setProductMrp(item.product_mrp);
    setProductDiscount(item.product_discount);
    setProductDiscountedPrice(item.product_discount_price);
    setProductUnitSelection(item.product_unit);
    setProductSellQuantity(item.product_is_gifted ? 0 : item.product_quantity);
    setProductGiftQuantity(item.product_is_gifted ? item.product_gift_quantity : 0);
    setProductExpirydate(item.product_expiry_date);
    setIsAddPressed({
      value: true,
      item: item,
      id:id,
      opened: 'My Products Add',
      currentDiscount: currentDiscount,
    });
  };

  const onEditPress = currentDiscount => {
    setProductMrp(item.product_mrp);
    setProductDiscount(item.product_discount);
    setProductDiscountedPrice(item.product_discount_price);
    setProductUnitSelection(item.product_unit);
    setProductSellQuantity(item.product_is_gifted ? 0 : item.product_quantity);
    setProductGiftQuantity(item.product_is_gifted ? item.product_gift_quantity : 0);
    setProductWeight(item.product_weight);
    setProductExpirydate(item.product_expiry_date);
    if (isMyPublished) {
      setIsAddPressed({
        value: true,
        item: item,
        id:id,
        opened: 'My Published Edit',
        currentDiscount: currentDiscount,
      });
    } else {
      navigation.navigate('Edit_Existing', {
        item: item,
        currentDiscount: currentDiscount,
      });
      setIsAddPressed({
        value: false,
        item: item,
        id:'',
        opened: '',
        currentDiscount: 0,
      });
    }
  };

  const onOpenBookings = (documentId, productId) => {
    navigation.navigate('Bookings',{productData:{document_id:documentId,product_id:productId}});
  };

  const onDeletePress = () => {
    setDeleteConfirmation({
      doc_id: id,
      doc_name: item.product_id,
      isDelete: true,
    });
  };

  const [currentDiscount, setCurrentDiscount] = useState(0);

  useEffect(() => {
    const fetchingCurrentDiscount = async () => {
      const currentDate = new Date();
      const isExpiryDate = item.product_expiry_date;

      let differenceInMilliseconds = 0;
      if (isExpiryDate !== undefined){
        const dateParts = isExpiryDate?.split('-');
        const expiryDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        differenceInMilliseconds = expiryDate - currentDate;
      }
      const differenceInDays = Math.floor(
        differenceInMilliseconds / (1000 * 60 * 60 * 24),
      );

      const string = {
        product_id: item.product_id,
        //quantity: listItem.product_sell_quantity ? listItem.product_sell_quantity : 0,
        quantity: item.product_quantity ? item.product_quantity : 0,
        expiry_days: differenceInDays ? differenceInDays : 0,
        location_zip: Number(userDetails.pincode),
      };
      try {
        const response = await currentDiscountTrend({string});
      const roundedValue = Math.round(response.predicted_value);
      setCurrentDiscount(roundedValue);
      } catch (error){
        console.log(error);
      }
    };
    fetchingCurrentDiscount();
  }, [ item, userDetails]);

  return (
    <>
      <View style={styles.alignment}>
        {isMyPublished && item.product_is_gifted && (
          <View style={[styles.giftICon]}>
            <MaterialCommunityIcons
              color="#FFFFFF"
              size={25}
              style={styles.addIconColor}
              name="hand-heart"
            />
          </View>
        )}
        <Image
          style={styles.imageStyles}
          resizeMethod="auto"
          source={
            item.product_image
              ? {uri: item.product_image}
              : require('../../../images/EmptyImage.jpg')
          }
        />
        <View style={[styles.containerDirection, styles.marginContainer]}>
          <TouchableOpacity
            onPress={() => onEditPress(currentDiscount)}
            style={[styles.containerDirection, styles.editableContainer]}>
            <EditSVG />
            <Text style={styles.editableText}>Edit</Text>
          </TouchableOpacity>
          {isMyPublished ? (
            <TouchableOpacity
              onPress={onDeletePress}
              style={[styles.containerDirection, styles.deleteContainer]}>
              <MaterialCommunityIcons
                color="#CF0000"
                size={moderateScale(20)}
                name="delete"
              />
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => onAddPress(currentDiscount)}
              style={[styles.containerDirection, styles.editableContainer]}>
              <AddSVG />
              <Text style={styles.editableText}>Add</Text>
            </TouchableOpacity>
          )}
        </View>
        {isMyPublished && (
          <>
            <View>
              <TouchableOpacity
                onPress={()=>onOpenBookings(item.document_id, item.product_id)}
                style={styles.buttonBooking}>
                <View style={styles.bookingContainer}>
                  <Text style={styles.buttonBookingText}>Bookings</Text>
                  <Ionicons
                    style={styles.buttonBookingIcon}
                    name="chevron-forward"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <View style={isMyPublished && styles.containerMargin}>
        <View style={styles.productTypeContainer}>
          <Text style={styles.productTypeText}>{item.product_type}</Text>
        </View>
        <Text style={[styles.title, isMyPublished && styles.titleMargin]}>
          {item.product_name}
        </Text>
        {isMyPublished && (
          <View style={[styles.flexAligin]}>
            <View style={styles.center}>
              <Text style={[styles.soldText, styles.soldTextFamily]}>
                {item.product_is_gifted ? 'Donate.' : 'Sold.'}
              </Text>
            </View>
            <View style={[styles.inputField]}>
              <TextInput
                onChangeText={onValueChange}
                value={value}
                style={[styles.input]}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.center}>
              <Text style={[styles.outOfFamily, styles.soldText]}>
                {' '}
                out of {item.product_quantity}
              </Text>
            </View>
          </View>
        )}
        <View style={styles.flexAligin}>
          <View style={styles.flexAligin}>
            <Text style={styles.text}>Expiry Date: </Text>
            <Text style={styles.text2}>
              {item.product_expiry_date ? item.product_expiry_date : '__'}
            </Text>
          </View>
          {!item.product_expiry_date && isMyProducts && (
            <MaterialCommunityIcons
              color="#CF0000"
              size={moderateScale(20)}
              name="alert"
            />
          )}
        </View>
        <Text style={styles.text}>
          MRP: <Text style={styles.text2}>{item.product_mrp} INR</Text>
        </Text>
        {isMyProducts && (
          <View style={styles.flexAligin}>
            <Text style={styles.text}>
              Quantity:{' '}
              <Text style={styles.text2}>
                {item.product_quantity ? item.product_quantity : '__'}
              </Text>
            </Text>
            {!item.product_quantity && (
              <MaterialCommunityIcons
                color="#CF0000"
                size={moderateScale(20)}
                name="alert"
              />
            )}
          </View>
        )}
        {
          <View style={styles.flexAligin}>
            <Text style={styles.text}>
              Discount:{' '}
              <Text style={styles.text2}>
                {item.product_discount ? `${item.product_discount}%` : '__'}
              </Text>
            </Text>
            {!item.product_discount && isMyProducts && (
              <MaterialCommunityIcons
                color="#CF0000"
                size={moderateScale(20)}
                name="alert"
              />
            )}
          </View>
        }
        <LinearGradient
          colors={['#869FCB', '#002058']}
          style={[
            styles.linearGradientStyles,
            isMyPublished && styles.linearMargin,
          ]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <View>
            <Text style={styles.discountText}>
              Current discount Trend {currentDiscount}%
            </Text>
          </View>
        </LinearGradient>
      </View>
      {/* {isMyPublished &&
        <TouchableOpacity style={styles.messageICon}>
      <MaterialCommunityIcons color="#002058" size={moderateScale(20)} name="message"/>
      </TouchableOpacity>} */}
      {isSelected === false && (
        <View>
          <MaterialCommunityIcons
            color="#009E83"
            size={moderateScale(20)}
            name="checkbox-blank-circle-outline"
            style={styles.messageICon}
          />
        </View>
      )}
      {isSelected === true && (
        <View>
          <MaterialCommunityIcons
            color="#009E83"
            size={moderateScale(20)}
            name="checkbox-marked-circle"
          />
        </View>
      )}
    </>
  );
}

function HomeProducts({top}) {
  const {
    isOneByOneSelected,
    setIsAllSelected,
    isAllSelected,
    setIsOneByoneSelected,
    isMyProducts,
    authToken,
    setUpdateApi,
    setApiData,
    setSelectedItems,
    selectedItems,
  } = useContext(Context);

  const [myProductsLength, setMyProductsLength] = useState(0);
  const [myPublishedLength, setMyPublishedLength] = useState(0);

  const [myPublishedData, setMyPublishedData] = useState([]);
  const [myProductsData, setMyProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsLoading(true);
      const dataArray = [];
      const getMyPublishedProducts = await getPublishedProducts({authToken});
      if (getMyPublishedProducts.succes) {
        let profileProducts = getMyPublishedProducts?.message;
        profileProducts.forEach(item => {
          if (item.data && item.data.data && Array.isArray(item.data.data)) {
              item.data.data.forEach(i=>{
               dataArray.push({
                  id:item.id,
                  data: i,
                });
              });
          }
        });
        }
      setMyPublishedData(dataArray);
      setMyPublishedLength(dataArray.length);
      setIsLoading(true);
      const getMyProductsProducts = await getProfileProducts({authToken});
      let profileProducts = [];
      if (getMyProductsProducts.succes) {
         profileProducts =
          getMyProductsProducts.profileProducts.profileProducts;
      }
      setMyProductsLength(profileProducts?.length);
      setMyProductsData(profileProducts);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  }, [authToken]);

  useEffect(() => {
    fetchData();
    setUpdateApi({reloadData: fetchData});
  }, [fetchData, setUpdateApi]);

  useEffect(() => {
    setApiData({
      myProductsLength: myProductsLength,
      myPublishedLength: myPublishedLength,
    });
  }, [setApiData, myProductsLength, myPublishedLength]);

  useEffect(() => {
    const publishedSelectedData =
    myPublishedData.map((data)=> {
      return data?.data;
    });
      setSelectedItems(isAllSelected ? ( isMyProducts ? myProductsData : publishedSelectedData) : []);
  }, [isAllSelected, myProductsData, myPublishedData, isMyProducts, setSelectedItems]);

  const itemSelectHandler = (item, isSelected) => {
    if (isSelected) {
      const updatedItem = selectedItems.filter(
        itm => (item.product_id !== itm.product_id),
      );
      console.log(updatedItem,'updatedItemupdatedItemupdatedItem');
      selectedItems.length ? setSelectedItems(updatedItem) : setSelectedItems(prev => [...prev, ...updatedItem]);
    } else {
      setSelectedItems(prev => [...prev, item]);
    }
  };

  useEffect(() => {
    isAllSelected && top && setIsAllSelected(false);
    isOneByOneSelected && top && setIsOneByoneSelected(false);
  }, [
    top,
    isAllSelected,
    isOneByOneSelected,
    setIsAllSelected,
    setIsOneByoneSelected,
  ]);

  return (
    <>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={[CssStyles.scrollContainer]}>
          {isLoading ? (
            <View style={styles.indicatorStyles}>
              <ActivityIndicator size="large" color="#002058" />
            </View>
          ) : (
            <View styles={styles.flastListStyles}>
              {(
                isMyProducts
                  ? myProductsData?.length || 0
                  : myPublishedData?.length || 0
              )
                ? (isMyProducts ? myProductsData : myPublishedData).map(
                    (listItem, index) => {
                      const item = isMyProducts ? listItem : listItem?.data;
                      let isSelected = false;
                      if (selectedItems.length){
                         isSelected = selectedItems.some(
                        selectedItem =>
                          (selectedItem?.product_id) === item.product_id,
                      );
                      }
                      return (
                        <View key={index}>
                          {
                            (isAllSelected || isOneByOneSelected ? (
                              <TouchableOpacity
                                onPress={() => itemSelectHandler(item, isSelected)}
                                style={[
                                  styles.singleProductContainer,
                                  isSelected && styles.selectedContainer,
                                ]}>
                                <RenderItems
                                  item={item}
                                  isSelected={isSelected}
                                  id={!isMyProducts ? listItem?.id : '0'}
                                />
                              </TouchableOpacity>
                            ) : (
                              <View
                                key={index}
                                style={styles.singleProductContainer}>
                                <RenderItems
                                 item={item}
                                 id={!isMyProducts ? listItem?.id : '0'}
                                />
                              </View>
                            ))}
                        </View>
                      );
                    },
                  )
                : null}
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flastListStyles: {
    alignItems: 'center',
  },
  selectedContainer: {
    borderColor: '#009E83',
    borderWidth: 1,
  },
  singleProductContainer: {
    backgroundColor: '#FFFFFF',
    minheight: moderateScale(200),
    width: moderateScale(345),
    marginVertical: moderateScale(10),
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: moderateScale(5),
    zIndex: 20,
  },
  alignment: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'rgba(0, 32, 88, 1)',
    fontSize: moderateScale(16),
    marginTop: moderateScale(8),
    fontFamily: 'Ubuntu-Bold',
  },
  titleMargin: {
    marginBottom: moderateScale(8),
  },
  containerMargin: {
    marginTop: moderateScale(20),
    marginLeft:moderateScale(20),
  },
  imageStyles: {
    height: moderateScale(122),
    width: moderateScale(122),
    borderRadius: moderateScale(20),
    marginTop: moderateScale(10),
  },
  containerDirection: {
    flexDirection: 'row',
  },
  marginContainer: {
    marginTop: moderateScale(20),
  },
  editableContainer: {
    backgroundColor: '#EBF6F3',
    height: moderateScale(24),
    width: moderateScale(56),
    borderRadius: moderateScale(10),
    margin: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  editableText: {
    color: '#002058',
    marginLeft: moderateScale(4),
    fontFamily: 'Ubuntu-Medium',
    fontSize: moderateScale(11),
  },
  linearGradientStyles: {
    borderRadius: moderateScale(25),
    paddingHorizontal: moderateScale(9),
    height: moderateScale(24),
    width: moderateScale(174),
    justifyContent: 'center',
    marginTop: moderateScale(10),
  },
  linearMargin: {
    marginTop: moderateScale(20),
    marginBottom: moderateScale(10),
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: moderateScale(10),
    fontFamily: 'Ubuntu-Medium',
  },
  indicatorStyles: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageICon: {
    position: 'absolute',
    right:moderateScale(10),
  },
  deleteContainer: {
    backgroundColor: '#F9F1F1',
    height: moderateScale(24),
    width: moderateScale(70),
    borderRadius: moderateScale(10),
    margin: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#CF0000',
    marginLeft: moderateScale(4),
    fontFamily: 'Ubuntu-Medium',
    fontSize: moderateScale(11),
  },
  giftICon: {
    backgroundColor: '#0098E6',
    height: moderateScale(35),
    width: moderateScale(35),
    justifyContent: 'center',
    alignItems: 'center',
    margin: moderateScale(10),
    borderRadius: moderateScale(15),
    position: 'absolute',
    zIndex: 20,
    left: moderateScale(-20),
  },
  productTypeContainer: {
    minheight: moderateScale(20),
    width: moderateScale(78),
    backgroundColor: '#F9F9F9',
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  productTypeText: {
    fontSize: moderateScale(10),
    color: '#002058',
    padding: moderateScale(2),
    fontFamily: 'Ubuntu-Medium',
  },
  text: {
    fontSize: moderateScale(12),
    color: '#002058',
    fontFamily: 'Ubuntu-Regular',
    marginTop: moderateScale(10),
  },
  text2: {
    fontSize: moderateScale(12),
    color: '#002058',
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(2),
    fontFamily: 'Ubuntu-Bold',
  },
  flexAligin: {
    display: 'flex',
    flexDirection: 'row',
  },
  bookingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBooking: {
    backgroundColor: '#009E83',
    width: moderateScale(146),
    height: moderateScale(34),
    borderRadius: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBookingText: {
    color: '#F8F9FC',
    fontSize: moderateScale(14),
    fontFamily: 'Ubuntu-Medium',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '20%',
  },
  buttonBookingIcon: {
    color: '#F8F9FC',
    fontSize: moderateScale(17),
    fontFamily: 'Ubuntu-Bold',
  },
  input: {
    fontSize: moderateScale(14),
    fontFamily: 'Ubuntu-Medium',
    padding: 0,
    margin: 0,
    textAlign: 'center',
  },
  inputField: {
    borderColor: '#B5C7E6',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(5),
    height: moderateScale(24),
    width: moderateScale(24),
  },
  center: {
    justifyContent: 'center',
  },
  soldText: {
    fontSize: moderateScale(12),
    color: '#002058',
    justifyContent: 'center',
  },
  soldTextFamily: {
    fontFamily: 'Ubuntu-Regular',
  },
  outOfFamily: {
    fontFamily: 'Ubuntu-Bold',
  },
});

export default HomeProducts;
