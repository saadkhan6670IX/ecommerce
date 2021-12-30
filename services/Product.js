import { ProductAPI } from '../utils/Axios';

export const getProducts = (body) => {
  return ProductAPI.post(`/api/v1/customer/product/view/`, body);
};

export const getProductDetail = (productId) => {
  return ProductAPI.get(`/api/v1/customer/product/view/${productId}`);
};

export const getProductReview = (productId) => {
  return ProductAPI.get(`/api/v1/customer/product/review/${productId}`);
};

export const getProductReviewReplies = (reviewID) => {
  return ProductAPI.get(`/api/v1/customer/product/replies/${reviewID}`);
};

export const addProductReviewReply = (params) => {
  return ProductAPI.post(`/api/v1/customer/product/reply/add`, params);
};


export const addProductReview = (params) => {
  return ProductAPI.post(`/api/v1/customer/product/review/add`, params);
};

export const updateProductReview = (params) => {
  return ProductAPI.post(`/api/v1/customer/product/review/update`, params);
};

//Parent Id 0 means : Get all main categories
export const getCateogries = () => {
  return ProductAPI.get(`/api/v1/customer/product/filter/view`);
};

// //Parent Id 0 means : Get all main categories
// export const getPromotion = () => {
//   return ProductAPI.get(`api/v1/customer/get_promotions`);
// };

// export const getPromotionsProducts = (params) => {
//   return ProductAPI.post(`/api/v1/customer/promotions_products`, params);
// };
