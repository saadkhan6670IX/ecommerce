import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Navigator from '../../utils/Navigator';
import Screens from '../../constants/ScreenConst';
import {useSelector} from 'react-redux';

import ThemeOneFilterCheckBox from './ThemeOneFilterCheckBox';

export default function index(props) {
  const themeNumber = useSelector((state) => state.themeReducer.themeNumber);

  // const OnCardPress = () => {
  //   Navigator.navigate(Screens.itemDetails, {item: props.item});
  // };

  switch (themeNumber) {
    case 1:
      return (
        <ThemeOneFilterCheckBox {...props}></ThemeOneFilterCheckBox>
      );
    default:
      return (
        <ThemeOneFilterCheckBox {...props}></ThemeOneFilterCheckBox>
      );
  }
}

const styles = StyleSheet.create({});
