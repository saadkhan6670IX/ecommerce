import {DiscountAPI} from '../utils/Axios';

//Parent Id 0 means : Get all main categories
export const getPromotion = (page = 1) => {
  return DiscountAPI.get(`/api/v1/customer/get_promotions?page=${page}`);
};

export const getPromotionsProducts = (params) => {
  return DiscountAPI.post(`/api/v1/customer/promotions_products`, params);
};

export const getCombos = (page = 1) => {
  return DiscountAPI.get(`/api/v1/customer/getcombos?page=${page}`);
};

export const getComboDetails = (comboId) => {
  return DiscountAPI.get(`/api/v1/customer/getcombo/${comboId}`);
};
