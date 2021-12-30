import {AccountAPI} from '../utils/Axios';

export const getAppSettings = (params) => {
  return AccountAPI.get('/api/v1/customer/app-settings');
};

export const getIntro = (params) => {
  return AccountAPI.get('/api/v1/customer/app-intro');
};

export const getCities = () => {
  return AccountAPI.get('/api/v1/misc/getCountrycities/1');
};
