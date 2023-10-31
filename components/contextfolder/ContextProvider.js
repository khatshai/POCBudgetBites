import React, { createContext, useState } from 'react';

const Context = createContext();

export const ContextProvider = function ContextProvider({children}) {

  const [userDetails, setUserDetails] = useState();

  const [userSelectedLanguage, setUserSelectedLanguage] = useState('English');
  const [selectedRole, setSelectedRole] = useState(null);
  const [typeOfBussiness, setTypeOfBussiness] = useState('');

  const [authToken, setAuthToken] = useState('');

  const [isGiftClicked, setIsGiftClicked] = useState(true);

  const [isMyProducts, setIsMyProducts] = useState(true);
  const [isMyPublished, setIsPublished] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);

  const [isPublishing, setIsPublishing] = useState(false);

  const [isMenuSelected, setIsMenuSelected] = useState(false);

  const [isAllSelected, setIsAllSelected] = useState(false);

  const [isOneByOneSelected, setIsOneByoneSelected] = useState(false);

  const [isAddPressed, setIsAddPressed] = useState({});

  const [isAddNewProducts, setIsAddNewProducts] = useState(false);
  const [isEditPressed, setIsEditPressed] = useState({});

  const [isRecomendedClicked, setIsRecomendedClicked] = useState(true);
  const [productType, setProductType] = useState('Packed Food');
  const [productImage, setProductImage] = useState('');
  const [productWeight, setProductWeight] = useState('');
  const [productId, setProductId] = useState('');
  const [productMrp, setProductMrp] = useState(null);
  const [productDescription, setIsProductDescription] = useState('');
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productExpiryDate, setProductExpirydate] = useState('');
  const [productDiscount, setProductDiscount] = useState(null);
  const [productDiscountedPrice, setProductDiscountedPrice] = useState(null);
  const [productUnitSelection, setProductUnitSelection] = useState('KG');
  const [productSellQuantity, setProductSellQuantity] = useState(null);
  const [productGiftQuantity, setProductGiftQuantity] = useState(null);

  const [deleteConfirmation, setDeleteConfirmation] = useState({doc_id:'', doc_name:'', isDelete:false});

  const [updateApi, setUpdateApi] = useState({
    reloadData: () => {},
  });

  const [apiData, setApiData] = useState([]);

  return (
    <Context.Provider
      value={{
        authToken,
        setAuthToken,
        selectedRole,
        setSelectedRole,
        typeOfBussiness,
        setTypeOfBussiness,
        isGiftClicked,
        setIsGiftClicked,
        isMyProducts,
        setIsMyProducts,
        isMyPublished,
        setIsPublished,
        isFilter,
        setIsFilter,
        isMenuSelected,
        setIsMenuSelected,
        isOneByOneSelected,
        setIsOneByoneSelected,
        isAllSelected,
        setIsAllSelected,
        isPublishing,
        setIsPublishing,
        isAddPressed,
        setIsAddPressed,
        isAddNewProducts,
        setIsAddNewProducts,
        selectedItems, setSelectedItems,
        isEditPressed,
        setIsEditPressed,
        isRecomendedClicked,
        setIsRecomendedClicked,
        userSelectedLanguage,
        setUserSelectedLanguage,
        productType, setProductType,
        productImage, setProductImage,
        productWeight, setProductWeight,
        productId, setProductId,
        productMrp, setProductMrp,
        productDescription, setIsProductDescription,
        productName, setProductName,
        productCategory, setProductCategory,
        productExpiryDate, setProductExpirydate,
        productDiscount, setProductDiscount,
        productDiscountedPrice, setProductDiscountedPrice,
        productUnitSelection, setProductUnitSelection,
        productSellQuantity, setProductSellQuantity,
        productGiftQuantity, setProductGiftQuantity,
        updateApi, setUpdateApi,
        setApiData, apiData,
        deleteConfirmation, setDeleteConfirmation,
        userDetails, setUserDetails,
      }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
