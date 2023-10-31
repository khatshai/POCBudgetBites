import React, {useState, useRef, useContext, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale, verticalScale} from '../../responsiveness/Metrics';
import Modal from 'react-native-modal';
import CssStyles from '../Styles';
import Context from '../contextfolder/ContextProvider';
import DateTimePicker from '@react-native-community/datetimepicker';

export function ProductType() {
  const {setProductType, productType} = useContext(Context);

  const [isDropDownClicked, setIsDropDownClicked] = useState(false);
  const [modalPosition, setModalPosition] = useState({top: 0});

  const dropdownRef = useRef(null);

  const foodTypes = [
    {label: 'Packed Food', value: 'PKFood'},
    {label: 'Baked Food', value: 'BKFood'},
    {label: 'Sweets', value: 'sweeys'},
    {label: 'Fruits', value: 'fruits'},
    {label: 'Vegetables', value: 'vegs'},
    {label: 'Dairy', value: 'dairy'},
    {label: 'Other', value: 'others'},
  ];

  let foodType = '';

  if (productType !== '') {
    foodType = foodTypes.filter(item => item.label === productType);
  }

  const [selectedFoodType, setSelectedFoodType] = useState(
    foodType !== '' ? foodType[0].value : 'PKFood',
  );

  const handleOptionSelection = option => {
    setIsDropDownClicked(!isDropDownClicked);
    setSelectedFoodType(option.value);
    setProductType(option.label);
  };

  const onIsdropDownClicked = () => {
    if (dropdownRef.current) {
      dropdownRef.current.measureInWindow((x, y, _, height) => {
        setModalPosition({top: y + height - 15, left: x});
      });
    }
    setIsDropDownClicked(!isDropDownClicked);
  };

  return (
    <>
      <Text style={styles.text}>Product Type*</Text>
      <View>
        <TouchableOpacity
          ref={dropdownRef}
          style={[styles.fieldContainer]}
          onPress={onIsdropDownClicked}>
          <View style={[styles.fieldSelector, styles.fieldSelectorWidth]}>
            <View style={styles.textContainer}>
              <Text style={styles.dropDownOptionText}>
                {foodTypes.find(foodItem => foodItem.value === selectedFoodType)?.label}
              </Text>
            </View>
            <View style={styles.visibility}>
              <Ionicons
                name={
                  !isDropDownClicked ? 'chevron-down-sharp' : 'chevron-up-sharp'
                }
                size={moderateScale(15)}
                style={styles.icon}
              />
            </View>
          </View>
        </TouchableOpacity>
          {isDropDownClicked && (
            <Modal
              isVisible={true}
              onBackdropPress={() => setIsDropDownClicked(false)}
              backdropOpacity={0}
              animationIn="slideInUp"
              animationOut="slideOutDown"
              style={[styles.dropDownFoodContainer, {top: modalPosition.top}]}>
              <ScrollView>
                {foodTypes.map(foodItem => (
                  <View key={foodItem.value}>
                    <TouchableOpacity onPress={() => handleOptionSelection(foodItem)}>
                      <Text style={styles.dropDownOptionText}>{foodItem.label}</Text>
                    </TouchableOpacity>
                    <Text style={CssStyles.horizontalLine} />
                  </View>
                ))}
              </ScrollView>
            </Modal>
          )}
      </View>
    </>
  );
}

export function ProductName() {
  const {setProductName, productName} = useContext(Context);

  const [name, setName] = useState(productName !== '' ? productName : '');

  const onProductNameChange = text => {
    setName(text);
    setProductName(text);
  };

  return (
    <>
      <Text style={styles.text}>Product Name*</Text>
      <View style={[styles.fieldSelector, styles.fieldSelectorWidth]}>
        <View style={styles.textContainer}>
          <TextInput
            placeholder="Enter Product Name*"
            placeholderTextColor="#B5C7E6"
            onChangeText={onProductNameChange}
            value={name}
          />
        </View>
        <TouchableOpacity style={styles.visibility}>
          <FontAwesome
            name="microphone"
            size={moderateScale(15)}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

export function WeightInGMS() {
  const {setProductWeight, productWeight} = useContext(Context);

  const [weight, setWeight] = useState(
    productWeight !== '' ? productWeight : '',
  );

  const onWeightChange = text => {
    setWeight(text);
    setProductWeight(text);
  };

  return (
    <>
      <Text style={styles.text}>Weight (gms)*</Text>
      <View style={[styles.fieldSelector, styles.fieldSelectorWidth]}>
        <View style={styles.textContainer}>
          <TextInput
            placeholder="Enter Product Name*"
            placeholderTextColor="#B5C7E6"
            onChangeText={onWeightChange}
            value={weight}
          />
        </View>
        <TouchableOpacity style={styles.visibility}>
          <FontAwesome
            name="microphone"
            size={moderateScale(15)}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

export function ExpiryDate(){
  const {setProductExpirydate, productExpiryDate} = useContext(Context);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(productExpiryDate ? productExpiryDate : '');
  const openDatePicker = () => {
    setShow(true);
  };

  const onChange = (e, selecteddate) => {
    const currentDate = selecteddate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getFullYear();
      setSelectedDate(fDate);
      setProductExpirydate(fDate);
  };

return (
  <View>
    <Text style={styles.text}>Expiry Date</Text>
    <View style={[styles.fieldSelector, styles.fieldSelectorWidth]}>
      <TouchableOpacity
        style={styles.textContainer}
        onPress={openDatePicker}
      >
        <Text
          style={[
            selectedDate === ''  ? styles.placeholderText : styles.textContainer,
          ]}
        >
        {selectedDate === '' ? 'Choose the expiry date' : selectedDate}
          </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.visibility} onPress={openDatePicker}>
        <AntDesign name="calendar" size={moderateScale(18)} style={styles.icon} />
      </TouchableOpacity>
    </View>
    {show &&
        (
            <DateTimePicker
              value={date}
              mode="date"
              display="calendar"
              onChange={onChange}
            />
        )
      }
    </View>
);
}

export function MRPSelector() {
  const {setProductMrp, productMrp} = useContext(Context);

  const [price, setPrice] = useState(productMrp ? productMrp.toString() : '');

  const onPriceChange = text => {
    const numericValue = parseFloat(text);
    setPrice(text);
    setProductMrp(numericValue);
  };

  return (
    <>
      <Text style={styles.text}>MRP*</Text>
      <View style={[styles.fieldSelector, styles.fieldSelectorWidth]}>
        <View style={styles.textContainer}>
          <TextInput
            placeholder="Enter MRP Price*"
            placeholderTextColor="#B5C7E6"
            onChangeText={onPriceChange}
            value={price}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={styles.visibility}>
          <FontAwesome
            name="microphone"
            size={moderateScale(15)}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

export function DiscountPercentage() {
  const {setProductDiscount, productDiscount} = useContext(Context);

  const [discount, setDiscount] = useState(
    productDiscount ? productDiscount.toString() : '',
  );

  const onDiscountChange = text => {
    const numericValue = parseFloat(text);
    setDiscount(text);
    setProductDiscount(numericValue);
  };

  return (
    <>
      <Text style={styles.text}>Discount %</Text>
      <View style={[styles.fieldSelector, styles.fieldSelectorWidth]}>
        <View style={styles.textContainer}>
          <TextInput
            placeholder="Enter discount percentage*"
            placeholderTextColor="#B5C7E6"
            onChangeText={onDiscountChange}
            value={discount}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={styles.visibility}>
          <FontAwesome
            name="microphone"
            size={moderateScale(15)}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

export function PriceCalculation() {
  const {
    productMrp,
    productDiscount,
    setProductDiscountedPrice,
    productDiscountedPrice,
  } = useContext(Context);

  const [price, setPrice] = useState(
    productDiscountedPrice ? productDiscountedPrice.toString() : '',
  );

  useEffect(() => {
    if (
      productMrp < 0 ||
      productDiscount < 0 ||
      productDiscount > 100 ||
      (!productMrp && !productDiscount)
    ) {
      setPrice('');
      setProductDiscountedPrice(0);
    } else if (!productDiscount && productMrp) {
      setPrice(productMrp);
      setProductDiscountedPrice(0);
    } else {
      const discountedPrice = productMrp - productMrp * (productDiscount / 100);
      setPrice(discountedPrice);
      setProductDiscountedPrice(discountedPrice);
    }
  }, [productDiscount, productMrp, setProductDiscountedPrice]);

  return (
    <>
      <Text style={styles.text}>Price</Text>
      <View style={styles.fieldContainer}>
        <View
          style={[
            styles.fieldSelector,
            styles.fieldSelectorWidth,
            styles.priceContainer,
          ]}>
          <View style={styles.textContainer}>
            <Text style={styles.priceText}>{price}</Text>
          </View>
        </View>
      </View>
    </>
  );
}

export function UnitsSelection() {
  const {setProductUnitSelection, productUnitSelection} = useContext(Context);
  const dropdownRef = useRef(null);

  const [modalPosition, setModalPosition] = useState({top: 0});

  const units = [
    //{label: 'Number', value: 'num'},
    {label: 'KG', value: 'KG'},
    {label: 'Gram', value: 'gms'},
    {label: 'MG', value: 'mg'},
    {label: 'Donez', value: 'dz'},
    {label: 'Litre', value: 'li'},
    {label: 'ML', value: 'ml'},
    // Add more languages as needed
  ];

  let unit = productUnitSelection;

  if (productUnitSelection !== '') {
    unit = units.filter(item => item.label === productUnitSelection);
  }

  const [selectedUnit, setSelectedUnit] = useState(
    unit.length ? unit[0].value : 'num',
  );
  const [isDropDownClicked, setIsDropDownClicked] = useState(false);

  const handleOptionSelection = option => {
    setIsDropDownClicked(!isDropDownClicked);
    //onIsScrollChange(!isDropDownClicked);
    setSelectedUnit(option.value);
    setProductUnitSelection(option.label);
  };

  const onIsScrollClicked = () => {
    setIsDropDownClicked(!isDropDownClicked);
    if (dropdownRef.current) {
      dropdownRef.current.measureInWindow((x, y, _, height) => {
        setModalPosition({top: y + height - 15, left: x});
      });
    }
    //onIsScrollChange(!isDropDownClicked);
  };

  return (
    <>
      <Text style={styles.text}>Units*</Text>
      <View>
        <TouchableOpacity
          ref={dropdownRef}
          style={[styles.fieldContainer]}
          onPress={onIsScrollClicked}>
          <View style={[styles.fieldSelector, styles.fieldSelectorWidth]}>
            <View style={styles.textContainer}>
              <Text style={styles.dropDownOptionText}>
                {units.find(unitItem => unitItem.value === selectedUnit)?.label}
              </Text>
            </View>
            <View style={[styles.visibility]}>
              <Ionicons
                name={
                  !isDropDownClicked ? 'chevron-down-sharp' : 'chevron-up-sharp'
                }
                size={moderateScale(15)}
                style={styles.icon}
              />
            </View>
          </View>
        </TouchableOpacity>
        {isDropDownClicked && (
          <Modal
            isVisible={true}
            onBackdropPress={() => setIsDropDownClicked(false)}
            backdropOpacity={0}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            style={[styles.dropDownUnitsContainer, {top: modalPosition.top}]}>
            <ScrollView>
              {units.map(unitItem => (
                <View key={unitItem.value}>
                  <TouchableOpacity onPress={() => handleOptionSelection(unitItem)}>
                    <Text style={styles.dropDownOptionText}>{unitItem.label}</Text>
                  </TouchableOpacity>
                  <Text style={CssStyles.horizontalLine} />
                </View>
              ))}
            </ScrollView>
          </Modal>
        )}
      </View>
    </>
  );
}

function Quantity({name, setProductQuantity, productQuantity}) {
  const [quantity, setQuantity] = useState(
    productQuantity ? productQuantity : 0,
  );

  const onPlusClick = () => {
    setQuantity(quantity + 1);
    setProductQuantity(quantity + 1);
  };

  const onMinusClick = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setProductQuantity(quantity - 1);
    }
  };

  return (
    <View>
      <Text style={styles.text}>{name}:</Text>
      <View style={styles.fieldContainer}>
        <View style={[styles.fieldSelector, styles.quantitySelector]}>
          <TouchableOpacity
            onPress={onMinusClick}
            style={[styles.iconBG, styles.iconBGColor]}>
            <AntDesign
              name="minus"
              size={moderateScale(15)}
              style={styles.icon}
            />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.text1}>{quantity}</Text>
          </View>
          <TouchableOpacity
            onPress={onPlusClick}
            style={[styles.iconBG, styles.iconBGColor]}>
            <AntDesign
              name="plus"
              size={moderateScale(15)}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export function QuantitySelector() {
  const {
    setProductSellQuantity,
    setProductGiftQuantity,
    productSellQuantity,
    productGiftQuantity,
  } = useContext(Context);

  return (
    <View style={styles.qunatityContainer}>
      <Quantity
        name={'Sell Quantity'}
        setProductQuantity={setProductSellQuantity}
        productQuantity={productSellQuantity}
      />
      <Quantity
        name={'Gift Quantity'}
        setProductQuantity={setProductGiftQuantity}
        productQuantity={productGiftQuantity}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: moderateScale(14),
    margin: moderateScale(2),
    color: '#002058',
    fontFamily: 'Ubuntu-Medium',
  },
  fieldSelectorWidth: {
    width: moderateScale(305),
  },
  quantitySelector: {
    width: moderateScale(130),
  },
  fieldSelector: {
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: '#B5C7E6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'rgba(0, 32, 88, 1)',
    margin: moderateScale(2),
    alignItems: 'center',
  },
  fieldContainer: {
    display: 'flex',
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: moderateScale(10),
    color: '#002058',
    fontFamily:'Ubuntu-Medium',
    fontSize:moderateScale(14),
  },
  placeholderText: {
    color: '#B5C7E6',
    fontSize: moderateScale(11),
    fontFamily: 'Ubuntu-Medium',
    textAlign: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: 'rgba(0, 32, 88, 1)',
  },
  iconBG: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: moderateScale(5),
    paddingRight: moderateScale(5),
    borderRadius: moderateScale(20),
  },
  text1: {
    fontSize: moderateScale(18),
    color: 'rgba(0, 32, 88, 1)',
    fontFamily: 'Ubuntu-Medium',
    textAlign: 'center',
    justifyContent: 'center',
    paddingLeft: moderateScale(10),
  },
  priceContainer: {
    backgroundColor: '#DCE2EC',
  },
  priceText: {
    color: '#869FCB',
    fontSize: moderateScale(14),
    fontFamily: 'Ubuntu-Medium',
    textAlign: 'center',
    justifyContent: 'center',
    paddingLeft: moderateScale(10),
  },
  dropDownUnitsContainer: {
    position: 'absolute',
    //top: verticalScale(460),
    left: moderateScale(30),
    right: 0,
    height: verticalScale(200),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: '#B5C7E6',
    backgroundColor: '#FFFFFF',
    zIndex: 1,
    width: moderateScale(305),
  },
  dropDownFoodContainer: {
    position: 'absolute',
    //top: moderateScale(190),
    left: moderateScale(30),
    right: 0,
    height: verticalScale(200),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: '#B5C7E6',
    backgroundColor: '#FFFFFF',
    zIndex: 1,
    width: moderateScale(305),
    // borderBottomLeftRadius:moderateScale(20),
    // borderBottomRightRadius:moderateScale(20),
  },

  dropDownOptionText: {
    fontSize: moderateScale(14),
    color: '#002058',
    fontFamily: 'Ubuntu-Medium',
    paddingLeft: moderateScale(10),
  },
  iconBGColor: {
    backgroundColor: '#EAEFF8',
    height: moderateScale(40),
  },
  qunatityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  visibility: {
    position: 'absolute',
    right: moderateScale(20),
    display: 'flex',
    justifyContent: 'center',
  },
  alignment: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyles:{
    fontFamily:'Ubuntu-Medium',
    fontSize:moderateScale(14),
  },
  centeredView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginTop:moderateScale(22),
  },
  modalView:{
    margin: moderateScale(20),
    backgroundColor:'#FFFFFF',
    borderRadius:moderateScale(20),
    width:'90%',
    padding:moderateScale(35),
    alignItems:'center',
    shadowColor:'#000',
    shadowOffset:{
      width:0,
      height:2,
    },
    shadowOpacity:0.25,
    shadowRadius:moderateScale(4),
    elevation:5,
  },
});
