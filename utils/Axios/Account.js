import axios from 'axios';
import Config from 'react-native-config';
import {
  requestErrorHander,
  requestInterceptor,
  responseErrorHander,
  responseInterceptor,
} from './HelperMethods';
import {store} from '../../store/ConfigureStore';

const accountAPI = axios.create({
  baseURL: Config.AUTH_BASE_URL,
  headers: {
    client_id: Config.CLIENT_ID,
    'Content-Type': 'application/json',
    // Authorization: store.getState().userReducer.token,
  },
});

// passing function refrences...
accountAPI.interceptors.request.use(requestInterceptor, requestErrorHander);

accountAPI.interceptors.response.use(responseInterceptor, responseErrorHander);

export default accountAPI;
