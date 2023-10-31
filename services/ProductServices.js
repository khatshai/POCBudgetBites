import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.29:8080';
//office 10.211.150.106
//192.168.0.29
//192.168.0.109
// pg 192.168.0.107
//my mobile 192.168.10.138
// 192.168.0.100
export async function fetchProducts() {
    return await axios.get('https://thapatechnical.github.io/userapi/users.json')
      .then(response => response.data);
}

export async function registration({userDetails}) {
  try {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify(userDetails),
  });
  return response;
  } catch (error){
    console.error(error,'error');
    return {sucess: false, msg:'Network error, Try again later!'};
  }
}

export async function userLogin({loginDetails}) {
  try {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify(loginDetails),
  });
  return response;
  } catch (error){
    console.error(error,'error api');
    return {sucess: false, msg:'Network error, Try again later!'};
  }
}

export async function recommendedList({authToken}) {
  try {
  const response = await fetch(`${API_BASE_URL}/product/getMasterProducts`, {
    method: 'GET',
    headers: {
      'Content-Type' : 'application/json',
      'authorization' : authToken,
    },
  });
  return await response.json();
  } catch (error){
    console.error(error,'error api');
    return {sucess: false, msg:'Network error, Try again later!'};
  }
}

//http://localhost:8080/product/getProfileProducts

export async function setProfileProducts({authToken, profileProducts}) {
  try {
  const response = await fetch(`${API_BASE_URL}/product/setProfileProducts`, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'x-access-token' : authToken,
    },
    body: JSON.stringify({profileProducts: profileProducts}),
  });
  return await response.json();
  } catch (error){
    console.error(error,'error api');
    return {sucess: false, msg:'Network error, Try again later!'};
  }
}

export async function getProfileProducts({authToken}) {
  try {
  const response = await fetch(`${API_BASE_URL}/product/getProfileProducts`, {
    method: 'GET',
    headers: {
      'Content-Type' : 'application/json',
      'authorization' : authToken,
    },
  });
  return await response.json();
  } catch (error){
    console.error(error,'error api');
    return {sucess: false, msg:'Network error, Try again later!'};
  }
}

export async function getPublishedProducts({authToken}) {
  try {
  const response = await fetch(`${API_BASE_URL}/postorder/getpublishedproduct`, {
    method: 'GET',
    headers: {
      'Content-Type' : 'application/json',
      'x-access-token' : authToken,
    },
  });
  return await response.json();
  } catch (error){
    console.error(error,'error api');
    return {sucess: false, msg:'Network error, Try again later!'};
  }
}

export async function setPublishedProducts({authToken, publishedData}) {
   try {
  const response = await fetch(`${API_BASE_URL}/postorder/setpublishedproduct`, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'authorization' : authToken,
    },
    body: JSON.stringify({publishedProducts: publishedData}),
  });
   return await response.json();
  } catch (error){
    console.error(error,'error api');
    return {sucess: false, msg:'Network error, Try again later!'};
  }
}

export async function updatingPublishedProduct({authToken, updatedData}) {
  try {
  const response = await fetch(`${API_BASE_URL}/postorder/updatepublishedstatus`, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'authorization' : authToken,
    },
    body: JSON.stringify(updatedData),
  });
  return await response.json();
  } catch (error){
    console.error(error,'error api');
    return {sucess: false, msg:'Network error, Try again later!'};
  }
}

export async function currentDiscountTrend({string}){
  //http://localhost:8000/docs#/default/predict_predict_post
  //192.168.0.107
  //192.168.0.100
  try {
    const discountTrend = await fetch('http://192.168.0.29:8000/predict',{
      method: 'POST',
      headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify(string),
    });
    return await discountTrend.json();
  } catch (error){
    console.log(error);
  }
}

export async function deleteElement({deleteData, authToken}){
  console.log(deleteData,'deleteingData');
  try {
    const response = await fetch(`${API_BASE_URL}/postorder/deletePublishdProduct`,{
      method: 'DELETE',
    headers: {
      'Content-Type' : 'application/json',
      'authorization' : authToken,
    },
    body: JSON.stringify(deleteData),
    });
    return await response.json();
  } catch (error){
    console.log(error);
  }
}

// export async function getSellerOrders({authToken, productData}){
//   try {
//     const response = await fetch(`${API_BASE_URL}/postorder/getSellerOrderDetails`,{
//       method:'GET',
//       headers:{
//         'Content-Type' : 'application/json',
//         'authorization' : authToken,
//       },
//       body: JSON.stringify(productData),
//     });
//     return response.json();
//   } catch (error){
//     console.log(error);
//   }
// }

export async function getSellerOrders({authToken, productData}) {
  console.log(productData,'getSellerOrders');
  try {
  const response = await fetch(`${API_BASE_URL}/postorder/getSellerOrderDetails`, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'authorization' : authToken,
    },
    body:JSON.stringify(productData),
  });
  return await response.json();
  } catch (error){
    console.error(error,'error api');
    return {sucess: false, msg:'Network error, Try again later!'};
  }
}

export async function orderAccepted({authToken, details}) {
  try {
  const response = await fetch(`${API_BASE_URL}/postorder/acceptOrderPickup`, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'authorization' : authToken,
    },
    body: JSON.stringify(details),
  });
  return await response.json();
  } catch (error){
    console.error(error,'error api');
    return {sucess: false, msg:'Network error, Try again later!'};
  }
}

export async function orderPickedUp({authToken, details}) {
  console.log(details,'orderPickedUp');
  console.log(details,'data');
  try {
  const response = await fetch(`${API_BASE_URL}/postorder/confirmOrderPickup`, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'authorization' : authToken,
    },
    body:JSON.stringify(details),
  });
  return await response.json();
  } catch (error){
    console.error(error,'error api');
    return {sucess: false, msg:'Network error, Try again later!'};
  }
}
