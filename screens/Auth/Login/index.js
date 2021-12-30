import React, {useState} from 'react';
import ThemeOneLogin from './ThemeOneLogin';
import {loginWithPhone} from '../../../services/User';
import Navigator from '../../../utils/Navigator';
import ScreenConst from '../../../constants/ScreenConst';

export default function index(props) {
  const [isFetching, setisFetching] = useState(false);

  const onLoginButtonPress = (params) => {
    setisFetching(true);
    loginWithPhone(params)
      .then((res) => {
        console.log('STATUS: ', res.status);
        console.log('RESPONSE: ', res.data);
        if (res.status === 200) {
          Navigator.navigate(ScreenConst.verificationCode, params);
        }
        setisFetching(false);
      })
      .catch((error) => {
        console.log('ERROR:', error.errorMessage);
        setisFetching(false);
      });
  };

  return (
    <ThemeOneLogin
      isFetching={isFetching}
      onLoginButtonPress={onLoginButtonPress}
      {...props}></ThemeOneLogin>
  );
}
