import React from 'react';
import {StyleSheet} from 'react-native';
import Navigator from '../../utils/Navigator';
import Screens from '../../constants/ScreenConst';
import {useSelector} from 'react-redux';

import ThemeOneItemCard from './ThemeOneItemCard';
import ThemeTwoItemCard from './ThemeTwoItemCard';

export default function index(props) {
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);
  const language = useSelector((state) => state.userReducer.language);

  const OnCardPress = () => {
    Navigator.navigate(Screens.itemDetails, {item: props.item});
  };

  switch (themeNumber) {
    case 1:
      return (
        <ThemeOneItemCard
          language={language}
          onPress={OnCardPress}
          {...props}></ThemeOneItemCard>
      );
    case 2:
      return (
        <ThemeTwoItemCard
          language={language}
          onPress={OnCardPress}
          {...props}></ThemeTwoItemCard>
      );
    default:
      return (
        <ThemeOneItemCard
          language={language}
          onPress={OnCardPress}
          {...props}></ThemeOneItemCard>
      );
  }
}

const styles = StyleSheet.create({});
