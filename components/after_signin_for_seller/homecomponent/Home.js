import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  findNodeHandle,
  Platform,
} from 'react-native';
import AddProductsImageSVG from '../../../images/sellericons/AddProductsImageSVG';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../responsiveness/Metrics';
import {HomeTopTab} from '../hometabscompoent/TopTab';
import GiftedSVG from '../../../images/sellericons/GiftedSVG';
import SoldProductsSVG from '../../../images/sellericons/SoldProductsSVG';
import CssStyles from '../../Styles';
import HomeProducts from './HomeProducts';
import Context from '../../contextfolder/ContextProvider';
import TypeSelection from './TypeSelection';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BlurView} from '@react-native-community/blur';
import CancelOkButtons from '../CancelOkButtons';
import {useNavigation} from '@react-navigation/native';
import {setPublishedProducts} from '../../../services/ProductServices';

function Home({scroll}) {
  const navigation = useNavigation();

  const {
    apiData,
    authToken,
    selectedItems,
    isMyProducts,
    isAllSelected,
    isOneByOneSelected,
    setIsOneByoneSelected,
    setIsAllSelected,
    isMyPublished,
    setSelectedItems,
  } = useContext(Context);

  const [isPublishSelected, setIsPublishSelected] = useState(false);

  const [viewRef, setViewRef] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    setViewRef(findNodeHandle(imageRef.current));
  }, []);

  const [isViewContentCentered, setIsViewContentCentered] = useState(false);

  const handleViewContentLayout = () => {
    setIsViewContentCentered(true);
  };

  const scrollViewRef = useRef(null);

  const [scrollY, setScrollY] = useState(scroll === false ? false : true);

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;

    if (
      offsetY > moderateScale(200) &&
      (isMyProducts ? apiData.myProductsLength : apiData.myPublishedLength) > 3
    ) {
      setScrollY(false);
    }
    if (offsetY <= 0 && !isAllSelected && !isOneByOneSelected) {
      setScrollY(true);
    }
  };

  const onDeletePressHandler = () => {
    console.log('deleted');
  };

  const onCloseClickHandler = () => {
    setSelectedItems([]);
    setIsAllSelected(false);
    setIsOneByoneSelected(false);
    setIsPublishSelected(false);
  };

  const onPublishNoHandler = () => {
    setIsPublishSelected(false);
  };

  const onPublishYesHandler = useCallback(async () => {
    const publishedData = selectedItems;
    try {
      const settingProducts = await setPublishedProducts({
        authToken,
        publishedData,
      });
      if (settingProducts.succes) {
        console.log('Product published');
        setIsPublishSelected(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [selectedItems, authToken]);

  const okClickOnSelected = () => {
    console.log(selectedItems, ',,,,,,,,,,,,,,,');
    setIsPublishSelected(true);
  };

  const cancleClickOnSelected = () => {
    setIsAllSelected(false);
    setIsOneByoneSelected(false);
  };

  const onAddNewProductsPressHandler = async () => {
    navigation.navigate('Add_Existing_Product');
  };

  return (
    <View
      style={styles.container}
      ref={imageRef}
      onLayout={() => setViewRef(findNodeHandle(imageRef.current))}>
      {scrollY ? (
        <HomeTopTab scrollY={true} />
      ) : isAllSelected || isOneByOneSelected ? (
        (isAllSelected || isOneByOneSelected) && (
          <View style={[CssStyles.topTabcontainer, styles.padding]}>
            <TouchableOpacity
              onPress={onDeletePressHandler}
              style={styles.deleteBackGround}>
              <View style={styles.deleteContainer}>
                <MaterialIcons
                  name="delete"
                  size={moderateScale(20)}
                  style={styles.deleteIconStyles}
                />
                <Text style={styles.deleteText}>Delete</Text>
              </View>
            </TouchableOpacity>
            <View style={CssStyles.topTabCenterContainer}>
              <Text style={styles.editText}>{selectedItems.length} Selected</Text>
            </View>
            <TouchableOpacity
              onPress={onCloseClickHandler}
              style={styles.closeBackGround}>
              <Ionicons
                size={moderateScale(25)}
                style={styles.closeIconStyles}
                name="close"
              />
            </TouchableOpacity>
          </View>
        )
      ) : (
        <HomeTopTab scrollY={false} />
      )}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={CssStyles.scrollContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {scrollY && (
          <>
            <Text style={styles.addProductsText}>Your Report</Text>
            <View style={styles.addReportContainer}>
              <View>
                <Text style={styles.passageText}>Sold Products</Text>
                <View style={styles.productContainer}>
                  <SoldProductsSVG />
                  <Text style={styles.productText}>35</Text>
                </View>
              </View>
              <View>
                <Text style={styles.passageText}>Gifted Products</Text>
                <View style={styles.productContainer}>
                  <GiftedSVG />
                  <Text style={styles.productText}>11</Text>
                </View>
              </View>
            </View>
            {scrollY && <TypeSelection />}
            {!(apiData.myPublishedLength || apiData.myProductsLength) && (
              <>
                <Text style={styles.addProductsText}>
                  Add Products in your Store
                </Text>
                <View style={styles.addProductsContainer}>
                  <AddProductsImageSVG />
                  <Text style={styles.passageText}>
                    Create your "My Products" list by directly
                    adding from our recommended list or by creating a new product.
                  </Text>
                  <TouchableOpacity
                    onPress={onAddNewProductsPressHandler}
                    style={CssStyles.addProductsButton}>
                    <Text style={CssStyles.addProductsButtonText}>
                      Add Products
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </>
        )}
        <HomeProducts top={scrollY} />
      </ScrollView>
      {(!scrollY && (isAllSelected || isOneByOneSelected)) ? isMyProducts ? (
        <View style={styles.bottomTabcontainer}>
          <CancelOkButtons
            cancleClick={cancleClickOnSelected}
            okClick={okClickOnSelected}
            okText={'Publish'}
          />
        </View>
      ) : isMyPublished ? (
        <View style={styles.bottomTabcontainer}>
        <TouchableOpacity style={styles.markItAs}>
            <Text style={styles.markItAsText}>Mark it as Sold / Donated</Text>
          </TouchableOpacity>
        </View>
      ) : null : null}
      {(viewRef || Platform.OS === 'ios') && isPublishSelected && (
        <BlurView
          style={CssStyles.absolute}
          viewRef={viewRef}
          blurType="light"
          blurAmount={3}
          blurRadius={5}>
          <View
            style={[
              CssStyles.centeredView,
              isViewContentCentered && CssStyles.centeredViewOpacity, // Show the content after centering
            ]}
            onLayout={handleViewContentLayout}>
            <View style={CssStyles.BlurContainer}>
              <Text style={CssStyles.blurTitle}>Publish Product?</Text>
              <Text style={CssStyles.blurPassage}>
                Are you sure you want to publish the selected product/s?
              </Text>
              <CancelOkButtons
                cancelText={'No'}
                okText={'Yes'}
                cancleClick={onPublishNoHandler}
                okClick={onPublishYesHandler}
              />
            </View>
          </View>
        </BlurView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },
  addReportContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: moderateScale(20),
    borderRadius: moderateScale(10),
    display: 'flex',
    flexDirection: 'row',
    padding: moderateScale(30),
    justifyContent: 'space-around',
  },
  productContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: moderateScale(10),
  },
  productText: {
    color: '#002058',
    fontSize: moderateScale(25),
    fontFamily: 'Ubuntu-Medium',
    marginHorizontal: moderateScale(5),
  },
  addProductsContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: moderateScale(20),
    alignItems: 'center',
    borderRadius: moderateScale(10),
  },
  addProductsText: {
    color: '#002058',
    marginHorizontal: horizontalScale(10),
    marginVertical: verticalScale(10),
    fontSize: moderateScale(16),
    fontFamily: 'Ubuntu-Medium',
  },
  passageText: {
    color: '#002058',
    fontSize: moderateScale(14),
    fontFamily: 'Ubuntu-Regular',
    textAlign:'center',
    paddingHorizontal:moderateScale(25),
  },
  selectedMenu: {
    position: 'absolute',
    right: moderateScale(5),
    backgroundColor: '#FFFFFF',
    width: moderateScale(159),
    height: moderateScale(83),
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {width: 0, height: moderateScale(5)},
    shadowOpacity: 6,
    shadowRadius: 6,
    elevation: 9,
    borderRadius: moderateScale(5),
    borderColor: '#e7efff',
    borderWidth: 1,
    zIndex: 999,
  },
  selectedMenuIsTopOpen: {
    top: moderateScale(110),
  },
  selectedMenuOpen: {
    top: moderateScale(300),
  },
  selectedContainerText: {
    fontSize: moderateScale(14),
    color: 'rgba(0, 32, 88, 1)',
    fontFamily: 'Ubuntu',
    margin: moderateScale(10),
  },
  padding: {
    padding: moderateScale(25),
    flexDirection: 'row',
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
  },
  deleteIconStyles: {
    color: '#CF0000',
  },
  deleteText: {
    color: '#CF0000',
  },
  editText: {
    color: '#002058',
    fontSize: moderateScale(14),
    fontFamily: 'Ubuntu-Medium',
  },
  closeBackGround: {
    backgroundColor: '#EAEFF8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(20),
    padding: moderateScale(5),
  },
  closeIconStyles: {
    color: 'rgba(0, 32, 88, 1)',
  },
  bottomTabcontainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    borderTopWidth: 2, // Add a bottom border
    borderColor: 'rgba(0, 0, 0, 0.1)', // Border color for the shadow
    shadowOffset: {width: 0, height: moderateScale(4)}, // Positive height for bottom shadow
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    position: 'relative',
    padding:moderateScale(15),
  },
  markItAs: {
    backgroundColor: '#009E83',
    justifyContent: 'center',
    width: moderateScale(345),
    height: moderateScale(34),
    borderRadius: moderateScale(20),
  },
  markItAsText: {
    color: '#F8F9FC',
    textAlign: 'center',
    fontSize: moderateScale(14),
    fontFamily: 'Ubuntu-Medium',
  },
});

export default Home;
