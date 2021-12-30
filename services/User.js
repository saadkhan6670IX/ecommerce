import {AuthAPI} from '../utils/Axios';

export const loginWithPhone = (params) => {
  return AuthAPI.post('/api/v1/customer/login', params);
};

export const logoutFromServer = () => {
  return AuthAPI.get('/api/v1/customer/logout');
};

export const verfityOTP = (params) => {
  return AuthAPI.post('/api/v1/customer/verify-otp', params);
};

export const resendOTP = (params) => {
  return AuthAPI.post('/api/v1/customer/resend-otp', params);
};

export const userProfile = (params) => {
  return AuthAPI.post('/api/v1/customer/resend-otp', params);
};
