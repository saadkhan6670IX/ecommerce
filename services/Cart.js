import {ProductAPI} from '../utils/Axios';

//NONE OF THE APIS BELOW ARE BEING USED, REMOVE LATER
export const addToCart = (body) => {
  return ProductAPI.post(`/v1/cart/add/`, body);
};

export const viewCart = (productId) => {
  return ProductAPI.get(`/v1/cart/view/`);
};

export const removeFromCart = (item_id) => {
  return ProductAPI.get(`/v1/cart/remove/${item_id}`);
};

//to be updated
export const updateCart = (body) => {
  return ProductAPI.post(`/v1/cart/update/`, body);
};
