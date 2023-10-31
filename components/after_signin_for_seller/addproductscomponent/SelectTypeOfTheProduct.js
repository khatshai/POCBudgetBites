import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  moderateScale,
} from '../../../responsiveness/Metrics';
import CssStyles from '../../Styles';
import BasicAddTopTab  from './BasicAddTopTab';
import { useNavigation } from '@react-navigation/native';

const SelectTypeOfTheProduct = () => {
  const navigation = useNavigation();

  const onAddExistingClick = () => {
    navigation.navigate('Add_Existing_Product');
  };

  const onAddNewProduct = () => {
    navigation.navigate('Adding_New_Product');
  };

  return (
    <View style={styles.container}>
    <View style={CssStyles.topTabcontainer}>
    <BasicAddTopTab color={'#002058'}/>
    </View>
      <ScrollView
        contentContainerStyle={[CssStyles.scrollContainer, styles.margin]}>
        <Text style={styles.headerTextStyles}>Pick Your Preferred Option</Text>
        <View style={styles.addProductsContainer}>
          <Text style={styles.passageText}>
            Add a product from your existing profile and easily edit the expiry
            and discount percentage based on your preference
          </Text>
          <TouchableOpacity onPress={onAddExistingClick} style={CssStyles.addProductsButton}>
            <Text style={CssStyles.addProductsButtonText}>
              Add From Existing
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.addProductsContainer}>
          <Text style={styles.passageText}>
            Add an entirely New Product and enter the details to provide you
            with notifications and best recommendations
          </Text>
          <TouchableOpacity onPress={onAddNewProduct} style={CssStyles.addProductsButton}>
            <Text style={CssStyles.addProductsButtonText}>
              Add New Product
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },
  margin: {
    marginTop: moderateScale(35),
  },
  headerTextStyles: {
    textAlign: 'center',
    fontSize: moderateScale(20),
    color: '#002058',
  },
  addProductsContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScale(10),
    alignItems: 'center',
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
  },
  passageText: {
    textAlign: 'center',
    fontSize: moderateScale(14),
    color: '#002058',
  },
});

export default SelectTypeOfTheProduct;
