import React, {createContext, useState} from 'react';


const BuyerContext = createContext();

export const BuyerContextProvider = function BuyerContextProvider({children}) {
    const [buerUserDetails, setBuyerUserDetails] = useState();
    const [buyerAuthToken,setBuyerAuthToken] = useState('');

    const [nearBuySeller, setNearBuySellers] = useState(true);
    const [allProducts, setAllProducts] = useState(false);
    const [favourites, setFavourites] = useState(false);
    const [isShopSelected , setIsShopSelected] = useState(false);
    const [isOrderRequestClicked, setIsOrderRequestClicked] = useState({isorder:false});

    const [updateBuyerApi, setUpdateBuyerApi] = useState({
        reloadBuyerData: () => {},
      });

      const [updateBuyerOrderApi, setUpdateBuyerOrderApi] = useState({
        reloadBuyerOrderData: () => {},
      });

    return (
        <BuyerContext.Provider
        value={{
            nearBuySeller, setNearBuySellers,
            allProducts, setAllProducts,
            favourites, setFavourites,
            isShopSelected , setIsShopSelected,
            isOrderRequestClicked, setIsOrderRequestClicked,
            buyerAuthToken,setBuyerAuthToken,
            updateBuyerApi, setUpdateBuyerApi,
            buerUserDetails, setBuyerUserDetails,
            updateBuyerOrderApi, setUpdateBuyerOrderApi,
        }}
        >
        {children}
        </BuyerContext.Provider>
    );
};

export default BuyerContext;

