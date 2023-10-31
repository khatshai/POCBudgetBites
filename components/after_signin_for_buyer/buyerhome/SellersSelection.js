import React, { useContext } from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {moderateScale} from '../../../responsiveness/Metrics';
import BuyerContext from '../../contextfolder/BuyerContextProvider';

function SellersSelection() {
    const {nearBuySeller, setNearBuySellers,
        allProducts, setAllProducts,
        favourites, setFavourites,
    } = useContext(BuyerContext);

    const onNearBySellersPress = () => {
        setNearBuySellers(true);
        setAllProducts(false);
        setFavourites(false);
    };

    const onAllProductsPress = () => {
        setAllProducts(true);
        setNearBuySellers(false);
        setFavourites(false);
    };

    const onFaviouritesPress = () => {
        setAllProducts(false);
        setNearBuySellers(false);
        setFavourites(true);
    };

  return (
    <View style={[styles.conatiner, styles.containers]}>
      <View style={styles.insideConatiner}>
        <View>
          <TouchableOpacity
          onPress={onNearBySellersPress}
            style={[styles.selectionButton, nearBuySeller ? styles.bgColorSelected : styles.bgColorUnSelected]}>
            <View>
              <Text style={styles.text}>Nearby Sellers</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
          onPress={onAllProductsPress}
            style={[styles.selectionButton, allProducts ? styles.bgColorSelected : styles.bgColorUnSelected]}>
            <View>
              <Text style={styles.text}>All Products</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
          onPress={onFaviouritesPress}
            style={[styles.selectionButton, favourites ? styles.bgColorSelected : styles.bgColorUnSelected]}>
            <View>
              <Text style={styles.text}>Favourites</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text:{
    fontFamily:'Ubuntu-Bold',
    fontSize:moderateScale(14),
    color:'#FF5700',
  },
  insideConatiner: {
    flexDirection: 'row',
    justifyContent:'space-around',
    width:'100%',
  },
  containers: {
    width: '100%',
    paddingVertical: moderateScale(15),
  },
  containerMargin: {
    marginHorizontal: moderateScale(20),
  },
  selectionButton:{
    borderWidth:moderateScale(2),
    height:moderateScale(36),
    borderRadius:moderateScale(20),
    alignItems:'center',
    justifyContent:'center',
    width:moderateScale(118),
  },
  bgColorUnSelected: {
    borderColor:'#ECE1DB',
  },
  bgColorSelected: {
    backgroundColor: '#FEF6F1',
    borderColor:'#FF5700',
  },
});

export default SellersSelection;
