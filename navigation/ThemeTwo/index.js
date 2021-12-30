import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import IntroStack from '../IntroStack';
import LanguageStack from '../LanguageStack';
import ThemeTwoAppStack from '../ThemeTwo/AppStack';
import ThemeTwoAuthStack from '../ThemeTwo/AuthStack';

export default function index(props) {
  const {hasSeenIntro, hasSelectedLanguage, isLoggedIn, appLoading} = props;
  //Theme One Navigation Flow Here
  //Return The Active Stack based on Reducer variable comming from props
  // if (!hasSeenIntro) {
  //   return <IntroStack />;
  // }
  if (!hasSelectedLanguage) {
    return <LanguageStack />;
  }
  return <ThemeTwoAppStack />;
}
