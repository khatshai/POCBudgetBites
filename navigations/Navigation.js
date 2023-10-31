import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LanguageComp from '../components/LanguageComp';
import UserTypeSelection from '../components/UserTypeSelection';
import BuyerOnBoarding from '../components/on_boarding/BuyerOnBoarding';
import SellerOnBoarding from '../components/on_boarding/SellerOnBoarding';
import SellerSignUpPage from '../components/signup/SellerSignUpPage';
import LoginPage from '../components/LoginPage';
import ForgetPassword from '../components/ForgetPassword';
import BuyerSignUpPage from '../components/signup/BuyerSignUpPage';
import {ContextProvider} from '../components/contextfolder/ContextProvider';
import ResetPassword from '../components/ResetPassword';
import VerificationCode from '../components/VerificationCode';
import Tab from '../components/after_signin_for_seller/hometabscompoent/Tab';
import EditExisting from '../components/after_signin_for_seller/homecomponent/EditExisting';
import AddAsSameExisting from '../components/after_signin_for_seller/homecomponent/AddAsSameExisting';
import HomeProducts from '../components/after_signin_for_seller/homecomponent/HomeProducts';
import PublishProducts from '../components/after_signin_for_seller/PublishProducts';
import Home from '../components/after_signin_for_seller/homecomponent/Home';
import TypeSelection from '../components/after_signin_for_seller/homecomponent/TypeSelection';
import SelectTypeOfTheProduct from '../components/after_signin_for_seller/addproductscomponent/SelectTypeOfTheProduct';
import AddExistingProduct from '../components/after_signin_for_seller/addproductscomponent/AddFromExistingProduct';
import AddingNewProduct from '../components/after_signin_for_seller/addproductscomponent/AddingNewProduct';
import SellerTypeSelection from '../components/bussinesstype/SellerTypeSelection';
import Bookings from '../components/after_signin_for_seller/homecomponent/Bookings';
import BuyerTypeSelection from '../components/bussinesstype/BuyerTypeSelection';
import ShopItemsPage from '../components/after_signin_for_buyer/buyerhome/ShopItemsPage';
import BuyerTab from '../components/after_signin_for_buyer/BuyerTab';
import { BuyerContextProvider } from '../components/contextfolder/BuyerContextProvider';
import BuyerCartItems from '../components/after_signin_for_buyer/buyerhome/buyercard/BuyerCartItems';


const Stack = createStackNavigator();

function Navigation() {
  return (
    <ContextProvider>
    <BuyerContextProvider>
      <Stack.Navigator screenOptions={{
        unmountOnBlur: false,
      }}>
        <Stack.Screen
        name="Language_Comp"
        component={LanguageComp}
        options={{
          header: () => null,
        }}
         />
        <Stack.Screen
        name="User_Type_Selection"
        component={UserTypeSelection}
        options={{
          header: () => null,
        }}
        />
        <Stack.Screen
        name="Seller_On_Boarding"
        component={SellerOnBoarding}
        options={{
          header: () => null,
        }}
        />
        <Stack.Screen
        name="Buyer_On_Boarding"
        component={BuyerOnBoarding}
        options={{
          header: () => null,
        }}
        />
        <Stack.Screen
        name="Seller_Sign_Up_Page"
        component={SellerSignUpPage}
        options={{
          header: () => null,
        }}
        />
        <Stack.Screen
        name="Buyer_Sign_Up_Page"
        component={BuyerSignUpPage}
        options={{
          header: () => null,
        }}
        />
        <Stack.Screen
        name="Login_In_Page"
        component={LoginPage}
        options={{
          header: () => null,
        }}
        />
        <Stack.Screen
        name="Forget_Password"
        component={ForgetPassword}
        options={{
          header: () => null,
        }}
        />
        <Stack.Screen
        name="Verification_Code"
        component={VerificationCode}
        options={{
          header: () => null,
        }}
        />
        <Stack.Screen
        name="Reset_Password"
        component={ResetPassword}
        options={{
          header: () => null,
        }}
        />
        <Stack.Screen
        name="Tab"
        component={Tab}
        options={{
          header: () => null,
        }}
        />
        <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: () => null,
        }}
        />
        <Stack.Screen
        name="Type_Selection"
        component={TypeSelection}
        options={{
          header: () => null,
        }}
        />
        <Stack.Screen
        name="Home_Products"
        component={HomeProducts}
        options= {({navigation}) => ({
          header: () => null,
          navigation,
        })}
        />
        <Stack.Screen
        name="Edit_Existing"
        component={EditExisting}
        options={{
          header: () => null,
        }}
        />
        <Stack.Screen
        name="Add_As_Same_Existing"
        component={AddAsSameExisting}
        options={{
          header: () => null,
        }}
        />
        <Stack.Screen
        name="Publish_Products"
        component={PublishProducts}
        options={{
          header: () => null,
        }}
        />
        <Stack.Screen
        name="Select_Type_Of_The_Product"
        component={SelectTypeOfTheProduct}
        options={{
          header: () => null,
        }}
        />
        <Stack.Screen
        name="Add_Existing_Product"
        component={AddExistingProduct}
        options={{
          header: () => null,
        }}
        />
        <Stack.Screen
        name="Adding_New_Product"
        component={AddingNewProduct}
        options={{
          header: () => null,
        }}
        />
        <Stack.Screen
        name="Seller_Type_Selection"
        component={SellerTypeSelection}
        options={{
          header: () => null,
        }}
        />
        <Stack.Screen
        name="Buyer_Type_Selection"
        component={BuyerTypeSelection}
        options={{
          header: () => null,
        }}
        />
        <Stack.Screen
        name="Bookings"
        component={Bookings}
        options={{
          header: () => null,
        }}
        />
         <Stack.Screen
        name="Shop_Items_Page"
        component={ShopItemsPage}
        options={{
          header: () => null,
        }}
        />
        <Stack.Screen
        name="Buyer_Tab"
        component={BuyerTab}
        options={{
          header: () => null,
        }}
        />
        <Stack.Screen
        name="Buyer_Cart_Items"
        component={BuyerCartItems}
        options={{
          header: () => null,
        }}
        />
    </Stack.Navigator>
    </BuyerContextProvider>
    </ContextProvider>
  );
}

export default Navigation;
