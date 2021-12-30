import axios from 'axios';
import Config from 'react-native-config';
import {
  requestErrorHander,
  requestInterceptor,
  responseErrorHander,
  responseInterceptor,
} from '../Axios/HelperMethods';

const branchesAPI = axios.create({
  baseURL: Config.BRANCHES_BASE_URL,
  headers: {
    client_id: Config.CLIENT_ID,
    'Content-Type': 'application/json',
  },
});

// passing function refrences...
branchesAPI.interceptors.request.use(requestInterceptor, requestErrorHander);

branchesAPI.interceptors.response.use(responseInterceptor, responseErrorHander);

export default branchesAPI;
