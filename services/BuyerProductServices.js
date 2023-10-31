import axios from "axios";

const API_BASE_URL = 'http://192.168.0.29:8080';

//pg 192.168.0.107
//192.168.0.29
//ofc 10.211.150.106
// 192.168.0.109
//192.168.0.100
export async function getSellerStores({buyerAuthToken}) {
    try {
    const response = await fetch(`${API_BASE_URL}/postorder/getstorewiselistofproduct`, {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        'x-access-token' : buyerAuthToken,
      },
    });
    return await response.json();
    } catch (error){
      console.error(error,'error api');
      return {sucess: false, msg:'Network error, Try again later!'};
    }
  }

  export async function addProductOrProductsToCard({buyerAuthToken, cartItems}) {
    try {
    const response = await fetch(`${API_BASE_URL}/postorder/setcart`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'authorization' : buyerAuthToken,
      },
      body: JSON.stringify(cartItems),
    });
     return await response.json();
    } catch (error){
      console.error(error,'error api');
      return {sucess: false, msg:'Network error, Try again later!'};
    }
  }

  export async function getCartDetails({buyerAuthToken}) {
    try {
    const response = await fetch(`${API_BASE_URL}/postorder/getCart`, {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        'authorization' : buyerAuthToken,
      },
    });
    return await response.json();
    } catch (error){
      console.error(error,'error api');
      return {sucess: false, msg:'Network error, Try again later!'};
    }
  }

  export async function requestForPickUp({buyerAuthToken, requestingdata}) {
    try {
    const response = await fetch(`${API_BASE_URL}/postorder/requestForPickup`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'authorization' : buyerAuthToken,
      },
      body: JSON.stringify(requestingdata),
    });
    return await response.json();
    } catch (error){
      console.error(error,'error api');
      return {sucess: false, msg:'Network error, Try again later!'};
    }
  }

  export async function getBuyerOrderDetails({buyerAuthToken}){
    try {
      const response = await fetch(`${API_BASE_URL}/postorder/getBuyerOrderDetails`,{
        method:'GET',
        headers:{
          'Content-Type' : 'application/json',
          'authorization' : buyerAuthToken,
        },
      });
      return await response.json();
    } catch (error){
      console.log(error);
    }
  }

  export async function readyForPickUp({buyerAuthToken, readydata}) {
    try {
    const response = await fetch(`${API_BASE_URL}/postorder/acceptOrderPickup`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'authorization' : buyerAuthToken,
      },
      body: JSON.stringify(readydata),
    });
    return await response.json();
    } catch (error){
      console.error(error,'error api');
      return {sucess: false, msg:'Network error, Try again later!'};
    }
  }
