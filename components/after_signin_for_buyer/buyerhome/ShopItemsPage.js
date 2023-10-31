import React, {useCallback, useContext, useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {moderateScale} from '../../../responsiveness/Metrics';
import LocationSVG from '../../../images/sellericons/LocationSVG';
import CssStyles from '../../Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';
import CartSVG from '../../../images/buyerIcons/CartSVG';
import { addProductOrProductsToCard } from '../../../services/BuyerProductServices';
import BuyerContext from '../../contextfolder/BuyerContextProvider';

export default function ShopItemsPage() {
  const {buyerAuthToken} = useContext(BuyerContext);
  const navigation = useNavigation();
  const [isFaviouriteAdded, setIsFaviouriteAdded] = useState(false);
  const [isShareClicked, setIsShareClicked] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [productDetails, setProductDetails] = useState([]);

  const route = useRoute();
  const {item, discountCount} = route.params;

  const onPlusClick = product => {
    const isExists = productDetails.find(
      i => i.product_id === product.product_id,
    );
    if (!productDetails.length || !isExists) {
      const updatedProduct = {
        ...product,
        product_quantity: 1,
      };
      const updatedData = [...productDetails, updatedProduct];
      setProductDetails(updatedData);
    } else {
      const updatedArray = productDetails.map(i => {
        if (i.product_id === product.product_id && i.product_quantity < product.product_quantity) {
          return {...product, product_quantity: i.product_quantity + 1};
        }
        return i;
      });
      setProductDetails(updatedArray);
    }
  };

  const onMinusClick = (product) => {
    const updatedArray = productDetails.map(i => {
      if (i.product_id === product.product_id && i.product_quantity > 1) {
        return {...product, product_quantity: i.product_quantity - 1};
      }
      if (i.product_id === product.product_id && i.product_quantity <= 1) {
        return null;
      }
      return i;
    }).filter(Boolean);
    setProductDetails(updatedArray);
  };

  const onHeartPress = () => {
    setIsFaviouriteAdded(!isFaviouriteAdded);
    setIsShareClicked(false);
    setIsSearchClicked(false);
  };

  const onSearchPress = () => {
    setIsFaviouriteAdded(false);
    setIsSearchClicked(!isSearchClicked);
    setIsShareClicked(false);
  };

  const onSharePress = () => {
    setIsFaviouriteAdded(false);
    setIsSearchClicked(false);
    setIsShareClicked(!isShareClicked);
  };

  const onBackPressHandler = () => {
    navigation.navigate('Buyer_Tab');
  };

  const onCartPressed = () => {
    navigation.navigate('Buyer_Cart_Items');
  };

  const onBookProductsPress = useCallback(async () => {
    const products = [...productDetails];
    const cartItems = {
      sellerId: item.sellerDetails.sellerId,
      productDetails: products,
    };
    const setCard = await addProductOrProductsToCard({buyerAuthToken, cartItems});
    if (setCard.succes){
      navigation.navigate('Buyer_Cart_Items');
    }
  },[buyerAuthToken, productDetails, item,navigation]);

  return (
    <View style={styles.container}>
      <View style={CssStyles.topTabcontainer}>
        <View style={styles.flex}>
          <View style={styles.heartContainer}>
            <TouchableOpacity
              onPress={onBackPressHandler}
              style={styles.backArrowBg}>
              <Ionicons name="chevron-back" size={moderateScale(25)} />
            </TouchableOpacity>
          </View>
          <View style={[CssStyles.topTabCenterContainer, styles.padding]}>
            <Text style={styles.headerText}>Store Products</Text>
          </View>
          <View style={styles.flex}>
            <View style={styles.heartContainer}>
              <TouchableOpacity
                onPress={onSearchPress}
                style={styles.heartIcon}>
                <AntDesign
                  color={'#869FCB'}
                  name={'search1'}
                  size={moderateScale(22)}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.heartContainer}>
              <TouchableOpacity onPress={onSharePress} style={styles.heartIcon}>
                <MaterialCommunityIcons
                  color={isShareClicked ? '#FF5700' : '#869FCB'}
                  size={moderateScale(30)}
                  name={isShareClicked ? 'share' : 'share-outline'}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.heartContainer}>
              <TouchableOpacity onPress={onHeartPress} style={styles.heartIcon}>
                <MaterialCommunityIcons
                  color={isFaviouriteAdded ? '#FF5700' : '#869FCB'}
                  size={moderateScale(22)}
                  name={isFaviouriteAdded ? 'heart' : 'cards-heart-outline'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.containerSpace}>
        <ScrollView contentContainerStyle={styles.storeDetailsContainer}>
          <Text style={[styles.tittle, styles.margin]}>
            {item.sellerDetails.storeName}
          </Text>
          <Text style={[styles.passage1]}>
            Products on Discount:{' '}
            <Text style={styles.passage2Bold}>{discountCount}</Text>
          </Text>
          <Text style={[styles.passage1]}>
            Confidence Rating:<Text style={styles.passage2Bold}> 4.5</Text>
          </Text>
          <View style={[styles.locationContainer]}>
            <LocationSVG />
            <Text style={styles.passage1}>
              {' '}
              1.2 km | {item.sellerDetails.address1}{' '}
            </Text>
          </View>
          {item.publishedProducts &&
            item.publishedProducts.map((product, index) => {
              const productsQ = productDetails.filter((i)=>i.product_id === product.product_id);
              return (
                <View key={index} style={styles.containerAlign}>
                  <View style={styles.singleProductContainer}>
                    <Image
                      style={styles.imageStyles}
                      resizeMethod="auto"
                      source={
                        product.product_image
                          ? {uri: product.product_image}
                          : require('../../../images/EmptyImage.jpg')
                      }
                    />
                    <View>
                      <View style={styles.productTypeContainer}>
                        <Text
                          style={[styles.passage2Bold, styles.marginBottom]}>
                          {product.product_type}
                        </Text>
                      </View>
                      <Text style={[styles.tittle, styles.marginBottom]}>
                        {product.product_name}
                      </Text>
                      <Text style={[styles.passage1]}>
                        Expiry{' '}
                        <Text style={styles.passage2Bold}>
                          . {product.product_expiry_date}
                        </Text>
                      </Text>
                      <Text style={[styles.passage1]}>
                        Mrp{' '}
                        <Text style={styles.passage2Bold}>
                          . {product.product_mrp}
                        </Text>
                      </Text>
                      <Text style={[styles.passage1]}>
                        Discount price{' '}
                        <Text style={styles.passage2Bold}>
                          . {product.product_discount_price}
                        </Text>
                      </Text>
                      <Text style={[styles.passage1]}>
                        Available Quantity{' '}
                        <Text style={styles.passage2Bold}>
                          . {product.product_quantity}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.storeDetailsContainer}>
                    <View style={styles.fieldContainer}>
                      <View style={[styles.fieldSelector]}>
                        <TouchableOpacity
                          onPress={() => onMinusClick(product, index)}
                          style={[styles.iconBG, styles.iconBGColor]}>
                          <AntDesign
                            name="minus"
                            size={moderateScale(15)}
                            style={styles.icon}
                          />
                        </TouchableOpacity>
                         {
                          productsQ ?
                          <View><Text style={styles.passage2Bold}>{productsQ[0]?.product_id === product.product_id ? productsQ[0]?.product_quantity : '0'}</Text></View>:
                          <View><Text style={styles.passage2Bold}>0</Text></View>
                         }
                        <TouchableOpacity
                          onPress={() => onPlusClick(product, index)}
                          style={[styles.iconBG, styles.iconBGColor]}>
                          <AntDesign
                            name="plus"
                            size={moderateScale(15)}
                            style={styles.icon}
                            color="#002058"
                          />
                        </TouchableOpacity>
                      </View>
                      <Text style={[styles.passage1, styles.alignment]}>
                        Add your required quantity
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
        </ScrollView>
        <View style={styles.bottomTabcontainer}>
          <TouchableOpacity onPress={onBookProductsPress} style={styles.buttonBookOrder}>
            <Text style={styles.buttonBookOrderText}>Book Product/s</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={onCartPressed} style={styles.cartContainer}>
        <CartSVG />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FC',
    flex: 1,
  },
  headerText: {
    color: '#002058',
    fontSize: moderateScale(14),
    fontFamily: 'Ubuntu-Medium',
  },
  singleProductContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  containerAlign: {
    backgroundColor: '#FFFFFF',
    minheight: moderateScale(203),
    width: moderateScale(345),
    marginVertical: moderateScale(10),
    borderRadius: moderateScale(10),
    padding: moderateScale(5),
    zIndex: 20,
    alignContent: 'center',
  },
  topContent: {
    height: moderateScale(100),
    flexDirection: 'row',
    width: '100%',
  },
  imageStyles: {
    height: moderateScale(122),
    width: moderateScale(122),
    borderRadius: moderateScale(20),
    marginTop: moderateScale(10),
  },
  padding: {
    padding: moderateScale(15),
  },
  iconsContainer: {
    justifyContent: 'center',
    margin: moderateScale(10),
  },
  flex: {
    flexDirection: 'row',
    height: moderateScale(80),
  },
  heartContainer: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    margin: moderateScale(5),
  },
  backArrowBg: {
    backgroundColor: '#EAEFF8',
    height: moderateScale(40),
    width: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(20),
  },
  storeDetailsContainer: {
    alignItems: 'center',
    backgroundColor: '#F8F9FC',
  },
  containerSpace: {
    justifyContent: 'space-between',
    flex: 1,
  },
  locationContainer: {
    display: 'flex',
    borderColor: '#002058',
    borderWidth: moderateScale(2),
    height: moderateScale(26),
    width: moderateScale(226),
    borderRadius: moderateScale(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldContainer: {
    display: 'flex',
  },
  fieldSelector: {
    height: moderateScale(30),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: '#B5C7E6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'rgba(0, 32, 88, 1)',
    margin: moderateScale(10),
    alignItems: 'center',
    width: moderateScale(314),
  },
  iconBG: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: moderateScale(5),
    paddingRight: moderateScale(5),
    borderRadius: moderateScale(20),
  },
  iconBGColor: {
    backgroundColor: '#EAEFF8',
    height: moderateScale(30),
  },
  tittle: {
    color: '#002058',
    fontFamily: 'Ubuntu-Bold',
    fontSize: moderateScale(18),
  },
  margin: {
    margin: moderateScale(10),
  },
  passage1: {
    color: '#002058',
    fontFamily: 'Ubuntu-Regular',
    fontSize: moderateScale(12),
    marginBottom: moderateScale(5),
  },
  passage2Bold: {
    fontFamily: 'Ubuntu-Bold',
    color: '#002058',
    fontSize: moderateScale(12),
  },
  alignment: {
    textAlign: 'center',
  },
  productTypeContainer: {
    height: moderateScale(0),
    minwidth: moderateScale(78),
    backgroundColor: '#F9F9F9',
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartContainer: {
    position: 'absolute',
    bottom: moderateScale(60),
    right: moderateScale(20),
  },
  buttonBookOrder: {
    backgroundColor: '#FF5700',
    justifyContent: 'center',
    width: moderateScale(345),
    height: moderateScale(34),
    borderRadius: moderateScale(20),
    marginLeft: moderateScale(20),
  },
  buttonBookOrderText: {
    color: '#F8F9FC',
    textAlign: 'center',
    fontSize: moderateScale(14),
    fontFamily: 'Ubuntu-Medium',
    margin: moderateScale(10),
  },
  bottomTabcontainer: {
    backgroundColor: '#FFFFFF',
    padding: moderateScale(15),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    borderTopWidth: 2, // Add a bottom border
    borderColor: 'rgba(0, 0, 0, 0.1)', // Border color for the shadow
    shadowOffset: {width: 0, height: moderateScale(4)}, // Positive height for bottom shadow
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
