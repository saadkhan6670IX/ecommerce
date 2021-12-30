import {AccountAPI} from '../utils/Axios';

export const addAddress = (params) => {
  return AccountAPI.post('/api/v1/customer/address/add', params);
};

export const viewAllAddress = (params) => {
  return AccountAPI.get('/api/v1/customer/address/view');
};

export const viewAddressById = (address_id) => {
  return AccountAPI.get(`/api/v1/customer/address/view/${address_id}`);
};

export const updateAnAddress = (params) => {
  return AccountAPI.post(`/api/v1/customer/address/update/`, params);
};

export const getUserProfile = () => {
  return AccountAPI.get(`/api/v1/customer/getprofle`);
};

export const updateUserProfile = (params) => {
  return AccountAPI.post(`/api/v1/customer/updateprofile`, params);
};
