import {OrdersAPI} from '../utils/Axios';

//updated

export const getMyOrders = (page) => {
  return OrdersAPI.get(`/api/v1/customer/order/history/0/${page}`);
};

export const getMyOrdersForHistory = (page) => {
  return OrdersAPI.get(`/api/v1/customer/order/history/1/${page}`);
};

export const checkout = (params) => {
  return OrdersAPI.post(`/api/v1/customer/cart/checkout/`, params);
};

export const verifyCart = (cart) => {
  console.log('applyCoupon cart', cart);
  return OrdersAPI.post(`/api/v1/customer/cart/verify_cart/`, cart);
};

export const placeOrder = (body) => {
  console.log(JSON.stringify(body));
  return OrdersAPI.post(`/api/v1/customer/cart/placeorder/`, body);
};

export const getOrderDetailbyID = (orderID) => {
  return OrdersAPI.get(`/api/v1/customer/order/view/${orderID}`);
};

export const getOrderDetailbyIDAndTimeZone = (body) => {
  return OrdersAPI.post(`/api/v1/customer/order/view_details`, body);
};

export const reOrderByOrderID = (orderID) => {
  return OrdersAPI.get(`/api/v1/customer/order/reorder/${orderID}`);
};

export const trackOrderByID = (orderID) => {
  return OrdersAPI.get(`/api/v1/customer/order/track/${orderID}`);
};

export const cencelOrder = (orderID) => {
  return OrdersAPI.get(`/api/v1/customer/order/cancel_order/${orderID}`);
};

export const getPaymentPage = (body) => {
  return OrdersAPI.post(`/api/v1/customer/payment/request`, body);
};

export const sendSupport = (params) => {
  return OrdersAPI.post('/api/v1/customer/order/send_support', params);
};

export const getOrderIds = () => {
  return OrdersAPI.get('/api/v1/customer/order/ordersIDs');
};
