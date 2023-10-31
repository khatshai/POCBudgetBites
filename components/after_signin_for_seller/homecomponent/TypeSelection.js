import React, {useContext, useState, useRef} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import CssStyles from '../../Styles';
import FilterCircleSVG from '../../../images/sellericons/FilterCircleSVG';
import {horizontalScale, moderateScale} from '../../../responsiveness/Metrics';
import SelectMenuCircle from '../../../images/sellericons/SelectMenuCircle';
import Context from '../../contextfolder/ContextProvider';
import Modal from 'react-native-modal';

function TypeSelection() {
  const [modalPosition, setModalPosition] = useState({top: 0});

  const dropdownRef = useRef(null);

  const {
    isMyProducts,
    setIsMyProducts,
    isMyPublished,
    setIsPublished,
    setIsFilter,
    setIsMenuSelected,
    isMenuSelected,
    apiData,
    setIsOneByoneSelected,
    setIsAllSelected,
  } = useContext(Context);

  const isMyProductsSelectHandler = () => {
    setIsMyProducts(true);
    setIsPublished(false);
    setIsFilter(false);
  };

  const isPublishSelectHandler = () => {
    setIsMyProducts(false);
    setIsPublished(true);
    setIsFilter(false);
  };

  const isFilterSelectHandler = () => {
    setIsMyProducts(prev => prev);
    setIsPublished(prev => prev);
    setIsFilter(true);
  };

  const onMenuHandler = () => {
    setIsMyProducts(prev => prev);
    setIsPublished(prev => prev);
    if (dropdownRef.current) {
      dropdownRef.current.measureInWindow((x, y, _, height) => {
        setModalPosition({top: y + height - 15, left: x});
      });
    }
    setIsMenuSelected(!isMenuSelected);
  };

  const onOneSelectedHandler = () => {
    setIsOneByoneSelected(true);
    setIsAllSelected(false);
    setIsMenuSelected(false);
  };

  const onAllSelectHandler = () => {
    setIsOneByoneSelected(false);
    setIsAllSelected(true);
    setIsMenuSelected(false);
  };

  return (
    <View style={[styles.conatiner, styles.containers]}>
      <View style={styles.insideConatiner}>
        <View>
          <TouchableOpacity
            onPress={isMyProductsSelectHandler}
            style={[
              CssStyles.selectionButton,
              styles.myProductsWidth,
              isMyProducts ? styles.bgColorSelected : styles.bgColorUnSelected,
            ]}>
            {apiData.myProductsLength ? (
              <View style={styles.countBackground}>
                <Text style={styles.countText}>
                  {apiData.myProductsLength}
                </Text>
              </View>
            ): null}
            <View>
              <Text style={styles.filterText}>My Products</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={isPublishSelectHandler}
            style={[
              CssStyles.selectionButton,
              styles.publishedWidth,
              isMyPublished ? styles.bgColorSelected : styles.bgColorUnSelected,
            ]}>
            {apiData.myPublishedLength ? (
              <View style={styles.countBackground}>
                <Text style={styles.countText}>{apiData.myPublishedLength}</Text>
              </View>
            ) : null}
            <View>
              <Text style={styles.filterText}>Published</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.insideConatiner}>
        {/* {top === false ? ( */}
        <>
          <View>
            <TouchableOpacity onPress={isFilterSelectHandler}>
              <FilterCircleSVG />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              ref={dropdownRef}
              onPress={onMenuHandler}
              style={styles.selectMenuMArgin}>
              <SelectMenuCircle />
            </TouchableOpacity>
            {isMenuSelected && (
              <Modal
                isVisible={true}
                onBackdropPress={() => setIsMenuSelected(false)}
                backdropOpacity={0}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                style={[styles.selectedMenu, {top: modalPosition.top}]}>
                <TouchableOpacity
                  style={CssStyles.horizontalLine}
                  onPress={onOneSelectedHandler}>
                  <Text style={styles.selectedContainerText}>
                    Select Products
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onAllSelectHandler}>
                  <Text style={styles.selectedContainerText}>
                    Select All Products
                  </Text>
                </TouchableOpacity>
              </Modal>
            )}
          </View>
        </>
        {/* ) : (
          <View>
            <TouchableOpacity
              onPress={isFilterSelectHandler}
              style={[
                styles.filterStyles,
                styles.selectMenuMArgin,
                CssStyles.selectionButton,
                styles.filterWidth,
                isFilter ? styles.bgColorSelected : styles.bgColorUnSelected,
              ]}>
              <FilterSVG />
              <Text style={styles.filterText}>Filter</Text>
            </TouchableOpacity>
          </View>
        )} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  insideConatiner: {
    flexDirection: 'row',
  },
  containers: {
    width: '100%',
    paddingVertical: moderateScale(15),
  },
  containerMargin: {
    marginHorizontal: moderateScale(20),
  },
  filterStyles: {
    display: 'flex',
    flexDirection: 'row',
  },
  filterText: {
    color: '#009E83',
    fontSize: moderateScale(14),
    fontFamily: 'Ubuntu-Medium',
  },
  countBackground: {
    backgroundColor: '#009E83',
    width: moderateScale(17),
    height: moderateScale(19),
    top: -10,
    right: 0,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
  },
  countText: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
  },
  filterWidth: {
    width: moderateScale(74),
  },
  myProductsWidth: {
    width: moderateScale(128),
    marginHorizontal: moderateScale(15),
  },
  selectMenuMArgin: {
    marginHorizontal: horizontalScale(10),
  },
  bgColorUnSelected: {
    backgroundColor: '#FFFFFF',
  },
  bgColorSelected: {
    backgroundColor: '#EBF6F3',
  },
  publishedWidth: {
    width: moderateScale(96),
  },
  selectedMenu: {
    position: 'absolute',
    right: 0,
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
  selectedContainerText: {
    fontSize: moderateScale(14),
    color: '#002058',
    fontFamily: 'Ubuntu-Regular',
    margin: moderateScale(10),
  },
});
export default TypeSelection;
