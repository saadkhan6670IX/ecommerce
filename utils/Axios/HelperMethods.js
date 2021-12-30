import axios from 'axios';
import { errorMessage } from '../Toast';
import { I18nManager } from 'react-native';
import { store } from '../../store/ConfigureStore';
import { setClientInactive } from '../../store/Theme/action';

export const requestInterceptor = async (config) => {
  const userReducer = await store.getState().userReducer;
  const token = userReducer.token;
  const userSelectedBranch = userReducer.userSelectedBranch;
  if (token) {
    // console.log('token milra, set krra', token);
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log('token nahi, del krra', token);
    config.headers.Authorization = {};
  }

  if (userSelectedBranch) {
    // console.log('userSelectedBranch milra, set krra', userSelectedBranch);
    config.headers.branch_id = userSelectedBranch.id;
  } else {
    // console.log('userSelectedBranch nahi, del krra', userSelectedBranch);
    config.headers.branch_id = null;
  }

  console.log('===============================');

  console.log('REQUEST');
  console.log('Headers : ', config.headers);

  console.log('Method : ', config.method);
  console.log('URL : ', config.baseURL + config.url);
  if (config.method !== 'get') {
    console.log('Request Body: ', config.data);
  }

  console.log(config)

  return config;
};

export const responseInterceptor = (config) => {
  console.log('===============================');

  console.log('REQUEST');
  console.log('Headers : ', config.config.headers);

  console.log('Method : ', config.config.method);
  console.log('URL : ', config.config.baseURL + config.config.url);
  if (config.config.method !== 'get') {
    console.log('Request Body: ', config.config.data);
  }
  store.dispatch(setClientInactive(false));
  console.log('RESPONSE');
  console.log('Status : ', config.status);
  console.log('Response : ', config.data);

  console.log('=============================== ');

  return config;
};

export const responseErrorHander = async (error) => {

  var errorObj = {
    message: null,
    status: null,
  };

  if (error.response) {
    console.log('error response', error.response.data.error);
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);

    const lang = I18nManager.isRTL ? 'ar' : 'en';

    errorObj.message = error.response?.data?.error[lang];
    errorObj.status = error.response?.status;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js

    // due to internet issue
    errorObj.message = error.request._response;
    errorObj.status = 408;
  } else {
    // Something happened in setting up the request that triggered an Error

    errorObj.message =
      'Something happened in setting up the request that triggered an Error';
    errorObj.status = null;
  }

  if (error.response.status === 403) {
    // alert(error.response.status)
    store.dispatch(setClientInactive(true));
  }
  console.error('API ERROR:', errorObj);
  console.log(`Error on this api = ${error.config.url}`);

  errorMessage(errorObj.message);
  return Promise.reject(errorObj);
};

export const requestErrorHander = async (err) => {
  return Promise.reject(err);
};
