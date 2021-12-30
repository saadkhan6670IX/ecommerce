import React, { useEffect, useState } from 'react';
import { Text, View, I18nManager, AppState, LayoutAnimation } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from '../utils/Navigator';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../store/Theme/action';
import SplashLoader from '../../src/components/SplashLoader';
import ClientAppUnavailable from '../../src/components/ClientAppUnavailable';
import ThemeOneAuthLoading from './ThemeOne';
import ThemeTwoAuthLoading from './ThemeTwo';
import { ColorClass, FontClass } from '../../src/utils/Theme';
//Api
import { getAppSettings } from '../services/AppSettings';

import { setUserLanguage, setNotificationCount } from '../store/User/action';

import {
  getNotifications,
} from '../services/Notification';

import { getData } from '../utils/AsyncStorage';

export default function index() {
  const hasSeenIntro = useSelector((state) => state.userReducer.hasSeenIntro);
  const hasSelectedLanguage = useSelector(
    (state) => state.userReducer.hasSelectedLanguage,
  );
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);

  const theme = useSelector((state) => state.themeReducer);
  const [appReady, setappReady] = useState(false);
  const [showSplash, setshowSplash] = useState(true);


  const [languageChangeLocation, setlanguageChangeLocation] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserLanguage(I18nManager.isRTL ? 'ar' : 'en'));
    // doing this to initly get the font which was previously loaded before we get any response from the api of app settings
    FontClass.updateFonts(theme.fontFamily);
  }, []);

  // checking for app state and upating the count of notifiction
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      if (isLoggedIn) {
        getNotifications(1).then((res) => {
          console.log('getNotifications', res);
          dispatch(setNotificationCount(res.data.total));
        });
      }
    }
  };

  // const setupFonts = (fontFamily) => {
  //   if (fontFamily === 'Roboto') {
  //     let fontObj = {
  //       light: 'Roboto-Light',
  //       medium: 'Roboto-Medium',
  //       regular: 'Roboto-Regular',
  //       semibold: 'Roboto-Black',
  //       bold: 'Roboto Bold',
  //     };
  //     FontClass.updateFonts(fontObj);
  //   } else if (fontFamily === 'Open Sans') {
  //     let fontObj = {
  //       light: 'OpenSans-Light',
  //       medium: 'OpenSans-Regular',
  //       regular: 'OpenSans-Regular',
  //       semibold: 'OpenSans-SemiBold',
  //       bold: 'OpenSans-Bold',
  //     };
  //     FontClass.updateFonts(fontObj);
  //   } else if (fontFamily === 'Montserrat') {
  //     let fontObj = {
  //       light: 'Montserrat-Light',
  //       medium: 'Montserrat-Medium',
  //       regular: 'Montserrat-Regular',
  //       semibold: 'Montserrat-SemiBold',
  //       bold: 'Montserrat-Bold',
  //     };
  //     FontClass.updateFonts(fontObj);
  //   } else if (fontFamily === 'Poppins') {
  //     let fontObj = {
  //       light: 'Poppins-Light',
  //       medium: 'Poppins-Medium',
  //       regular: 'Poppins-Regular',
  //       semibold: 'Poppins-SemiBold',
  //       bold: 'Poppins-Bold',
  //     };
  //     FontClass.updateFonts(fontObj);
  //   } else if (fontFamily === 'Lato') {
  //     let fontObj = {
  //       light: 'Lato-Hairline',
  //       medium: 'Lato-Bold',
  //       regular: 'Lato-Regular',
  //       semibold: 'Lato-Bold',
  //       bold: 'Lato-Black',
  //     };
  //     FontClass.updateFonts(fontObj);
  //   } else {
  //     let fontObj = {
  //       light: 'CormorantInfant-Light',
  //       medium: 'CormorantInfant-Medium',
  //       regular: 'CormorantInfant-Regular',
  //       semibold: 'CormorantInfant-SemiBold',
  //       bold: 'CormorantInfant-Bold',
  //     };
  //     FontClass.updateFonts(fontObj);
  //   }
  // };
  //check from which screen language was changed, so that we navigate it back to that same screen
  useEffect(() => {
    getAppSettings()
      .then((response) => {
        //emulating that theme 2 and different colors are returned from api
        // response.data.data.theme_number = 2;

        FontClass.updateFonts(response.data.data.app_font_en);

        let {
          app_color,
          primary_btn_backcolor,
          primary_btn_textcolor,
          sec_btn_backcolor,
          sec_btn_textcolor,
          font_family_en,
          font_family_ar,
          primary_color,
          sec_color,
          client_active
        } = response.data.data;
        ColorClass.updateColors({
          primary: primary_color,
          primaryLight: sec_color,
          primaryBtnBackcolor: primary_btn_backcolor,
          primaryBtnTextcolor: primary_btn_textcolor,
          secondaryBtnBackcolor: sec_btn_backcolor,
          secondaryBtnTextcolor: sec_btn_textcolor,
        });
        // setupFonts(font_family_en);

        dispatch(setTheme(response.data.data));

        getData('languageChangeLocation').then((res) => {
          setlanguageChangeLocation(res != null ? JSON.parse(res) : null);
          // setappReady(true);

          setTimeout(() => {
            setshowSplash(false);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
          }, 1000);

        });
      })
      .catch((err) => {
        if (err.status === 408) {
          //no internet
          alert('Please check your intenet connection');
        }
        setshowSplash(false);
      });
  }, []);

  //this function will decide based on some conditions which stack to render
  const renderActiveStack = () => {
    switch (themeNumber) {
      case 1:
        return (
          <ThemeOneAuthLoading
            languageChangeLocation={languageChangeLocation}
            hasSeenIntro={hasSeenIntro}
            isLoggedIn={isLoggedIn}
            hasSelectedLanguage={hasSelectedLanguage}
          />
        );
      case 2:
        return (
          <ThemeOneAuthLoading
            languageChangeLocation={languageChangeLocation}
            hasSeenIntro={hasSeenIntro}
            isLoggedIn={isLoggedIn}
            hasSelectedLanguage={hasSelectedLanguage}
          />
        );

      default:
        return (
          <ThemeOneAuthLoading
            languageChangeLocation={languageChangeLocation}
            hasSeenIntro={hasSeenIntro}
            isLoggedIn={isLoggedIn}
            hasSelectedLanguage={hasSelectedLanguage}
          />
        );
    }
  };

  if (theme.ClientAppUnavailable) {
    return <ClientAppUnavailable></ClientAppUnavailable>;
  }
  if (showSplash) {
    return <SplashLoader></SplashLoader>;
  } else {
    return (
      <NavigationContainer
        ref={(navigatorRef) => {
          Navigator.setTopLevelNavigator(navigatorRef);
        }}>
        {renderActiveStack()}
      </NavigationContainer>
    );
  }
}
