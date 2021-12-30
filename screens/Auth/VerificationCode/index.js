import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ThemeOneVerificationCode from './ThemeOneVerificationCode';
import { login } from '../../../store/User/action';
import { verfityOTP, resendOTP } from '../../../services/User';
import { successMessage } from '../../../utils/Toast';
import ScreenConst from '../../../constants/ScreenConst';
import Navigator from '../../../utils/Navigator';
import { useDispatch, useSelector } from 'react-redux';
// import {login} from '../../../store/User/action';

export default function index(props) {
  // To handle loader in button
  const [isFetching, setIsFetching] = useState(false);
  const [invalidCodeAttempt, setInvalidCodeAttempt] = useState(0);

  const dispatchAction = useDispatch();

  const language = useSelector((state) => state.userReducer.language);

  const rootScreen = props.route.params?.commingFrom;

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // this is to start timer after 30 seconds to stop the timer and start it again after submit button is pressed
    let timer;
    if (seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setInvalidCodeAttempt(0)
      // setSeconds(0);
    }
    // need to remove it when user goes back ... because of memory leakage.
    return () => clearInterval(timer);
  }, [seconds]);

  console.log('seconds', seconds);

  // API Calls from Actions
  const onVerifyOTPButtonPressed = (params) => {
    setIsFetching(true);
    verfityOTP(params)
      .then((res) => {
        console.log('STATUS: ', res.status);
        console.log('RESPONSE: ', res.data);
        setIsFetching(false);
        if (res.status === 200) {
          // to handle after response...
          // Navigator.navigate(ScreenConst.cartDetails);
          dispatchAction(login(res.data.data));

          Navigator.popToTop();
          if (rootScreen === ScreenConst.viewCart) {
            Navigator.navigate(ScreenConst.cartDetails);
          }
        }
      })
      .catch((error) => {
        console.log('ERROR:', error);
        if (error.status == 422) {
          console.log('invalidCodeAttempt', invalidCodeAttempt);
          if (invalidCodeAttempt < 4) {
            setInvalidCodeAttempt(invalidCodeAttempt + 1)
          }
          else {
            setInvalidCodeAttempt(invalidCodeAttempt + 1)
            setSeconds(5)
          }
        }
        setIsFetching(false);
      });
  };
  // Resending the code...
  const onResendButtonPressed = (params) => {
    resendOTP(params)
      .then((res) => {
        console.log('STATUS: ', res.status);
        console.log('RESPONSE: ', res.data);

        if (res.status === 200) {
          successMessage(res.data.message[language]);
        }
        setIsFetching(false);
      })
      .catch((error) => {
        setIsFetching(false);
      });
  };

  return (
    <ThemeOneVerificationCode
      isFetching={isFetching}
      onVerifyButtonPressed={onVerifyOTPButtonPressed}
      onResendButtonPressed={onResendButtonPressed}
      invalidCodeAttempt={invalidCodeAttempt}
      {...props}></ThemeOneVerificationCode>
  );
}

const styles = StyleSheet.create({});
