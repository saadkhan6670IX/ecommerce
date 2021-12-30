import React, { useEffect } from 'react';
import { getData } from '../../utils/AsyncStorage';
import IntroStack from '../IntroStack';
import LanguageStack from '../LanguageStack';
import ThemeOneAppStack from '../ThemeOne/AppStack';
import { StatusBar, Platform, UIManager, View, Text, LogBox } from 'react-native';
import { Loader } from '../../components';
import OneSignal from 'react-native-onesignal';
import Navigator from '../../utils/Navigator';
import ScreenConst from '../../constants/ScreenConst';
import { useDispatch, useSelector } from 'react-redux';
import {
  incrementNotificationCount,
  setNotificationToken,
} from '../../store/User/action';

import Config from 'react-native-config';


export default function index(props) {
  const {
    hasSeenIntro,
    hasSelectedLanguage,
    languageChangeLocation,
    appLoading,
  } = props;

  const dispatch = useDispatch();
  useEffect(() => {
    /* O N E S I G N A L   S E T U P */
    OneSignal.setAppId(Config.ONE_SIGNAL_APP_ID);
    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent) => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notificationReceivedEvent,
        );
        dispatch(incrementNotificationCount());
      },
    );

    OneSignal.setNotificationOpenedHandler((notification) => {
      console.log('OneSignal: notification opened:', notification);
      const data = notification.notification.additionalData;

      if (data.navigate == 1) {
        Navigator.push(ScreenConst.trackOrder, {
          order_no: data.order_id,
          commingFrom: 'pushNotification',
        });
      }
    });
  }, []);

  if (!hasSelectedLanguage) {
    return <LanguageStack />;
  }

  if (!hasSeenIntro) {
    return <IntroStack />;
  }

  if (hasSeenIntro && hasSelectedLanguage) {
    return (
      <>
        <ThemeOneAppStack initialRouteName={languageChangeLocation} />
      </>
    );
  }
  // if none of the condition is met, send user to APP stack
  // return <ThemeOneAppStack initialRouteName={IntroStack} />;
}
