import axios from 'axios';
import Config from 'react-native-config';
import {
  requestErrorHander,
  requestInterceptor,
  responseErrorHander,
  responseInterceptor,
} from '../Axios/HelperMethods';
import {store} from '../../store/ConfigureStore';

const ordersAPI = axios.create({
  baseURL: Config.ORDERS_BASE_URL,
  headers: {
    client_id: Config.CLIENT_ID ,
    'Content-Type': 'application/json',
    // 'Authorization': store.getState().userReducer.token
  },
});

// passing function refrences...
ordersAPI.interceptors.request.use(requestInterceptor, requestErrorHander);

ordersAPI.interceptors.response.use(responseInterceptor, responseErrorHander);

export default ordersAPI;


