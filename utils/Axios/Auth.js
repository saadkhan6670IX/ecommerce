import axios from 'axios';
import Config from 'react-native-config';
import {
  requestErrorHander,
  requestInterceptor,
  responseErrorHander,
  responseInterceptor,
} from '../Axios/HelperMethods';
import {store} from '../../store/ConfigureStore';

const authAPI = axios.create({
  baseURL: Config.AUTH_BASE_URL,
  headers: {
    client_id: Config.CLIENT_ID,
    'Content-Type': 'application/json',
    // Authorization: store.getState().userReducer.token,
  },
});

// passing function refrences...
authAPI.interceptors.request.use(requestInterceptor, requestErrorHander);

authAPI.interceptors.response.use(responseInterceptor, responseErrorHander);

export default authAPI;
